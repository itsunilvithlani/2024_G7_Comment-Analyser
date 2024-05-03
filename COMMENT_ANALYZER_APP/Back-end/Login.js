const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const auth = require('./routers/auth.js');
const comments = require('./routers/comments.js');
const payment = require('./routers/payment.js');
const dotenv = require('dotenv');
const port = 3001;

dotenv.config();

// Database configuration
mongoose.connect(process.env.DB).then(() => {
  console.log('Connected to MongoDB');
}).catch((err)=>{
  console.log('Connection Failed',err);
})


app.use(cors());
app.use(bodyParser.json());
app.use('/auth', auth);
app.use('/comments', comments);
app.use('/payment', payment);

app.get("/", (req, res) => {
  res.send("hello world");
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

