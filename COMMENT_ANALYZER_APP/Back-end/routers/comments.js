const express = require('express');
const Comments = require("../models/Comments.js");
const fetchuser = require("../middlewares/fetchuser.js");
const { body, validationResult } = require('express-validator');
const UrlModel = require('../models/UrlModel.js');
const { default: mongoose } = require('mongoose');
const { default: axios } = require('axios');
const User = require('../models/User.js');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

// ROUTE 1: Get all the comments using GET "/comments/getuser" Login required
router.get('/fetchallurls', fetchuser, async (req, res) => {
  try {
    // Find the user by user ID
    const user = await User.findById(req.user.id).populate('urls');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract URLs from the user object
    const urls = user.urls.map(url => url.url);

    res.json(urls);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/addcomments', fetchuser, async (req, res) => {
  try {
    // Fetch comments from the API and include the URL in the request body
    const response = await axios.post("http://127.0.0.1:5000/get_comments", req.body);
    console.log(response.data);
    // Find the user by user ID
    const user = await User.findById(req.user.id);

    // Check if the URL exists in the database
    const existingUrl = await UrlModel.findOne({ url: req.body.videoId });

    if (existingUrl) {
      // URL already exists, check if it belongs to the current user
      //user add Url id
      if (existingUrl && !user.urls.includes(existingUrl._id)) {
        user.urls.push(existingUrl._id);
        await user.save();
      }
      const isUserUrl = existingUrl.users.some(userId => userId.equals(user._id));

      if (isUserUrl) {
        // URL belongs to the user, update comments
        //delete all comments 
        await Comments.deleteMany({ _id: { $in: existingUrl.comments } });
        // Create new comments and save them
        const savedComments = await Promise.all(response.data.map(async (commentData) => {
          const newComment = new Comments(commentData);
          return await newComment.save();
        }));

        // Update comments array in the URL model
        existingUrl.comments = savedComments.map(comment => comment._id);
        await existingUrl.save();
        res.send(response.data);
      } else {
        // URL does not belong to the user, add the user to the URL's users array
        existingUrl.users.push(user._id);
        await existingUrl.save();

        await Comments.deleteMany({ _id: { $in: existingUrl.comments } });

        // Create new comments and save them
        const savedComments = await Promise.all(response.data.map(async (commentData) => {
          const newComment = new Comments(commentData);
          return await newComment.save();
        }));

        // Update comments array in the URL model
        existingUrl.comments = savedComments.map(comment => comment._id);
        await existingUrl.save();

        res.send(response.data);
      }
    } else {
      // URL does not exist, create a new URL and associate it with the user
      const newUrl = new UrlModel({
        url: req.body.videoId,
        comments: [],
        users: [user._id]
      });

      // Create new comments and associate them with the URL
      const savedComments = await Promise.all(response.data.map(async (commentData) => {
        const newComment = new Comments(commentData);
        return await newComment.save();
      }));

      newUrl.comments = savedComments.map(comment => comment._id);
      await newUrl.save();

      // Update user's URLs array
      user.urls.push(newUrl._id);
      await user.save();

      res.send(response.data);
    }
  }
  catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;