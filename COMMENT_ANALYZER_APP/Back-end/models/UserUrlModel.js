const mongoose = require('mongoose');

const userUrlSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  urlId: { type: mongoose.Schema.Types.ObjectId, ref: 'UrlModel' }
});

const UserUrl = mongoose.model('UserUrl', userUrlSchema);

module.exports = UserUrl;
