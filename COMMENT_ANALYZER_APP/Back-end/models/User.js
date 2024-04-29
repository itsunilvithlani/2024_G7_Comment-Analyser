const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username:{type: String, required: true},
  email: {type:String,unique: true,required:true},
  password: {type:String,required:true},
  urls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'urls' }]
});

const User = mongoose.model('users',userSchema);

module.exports = User;
