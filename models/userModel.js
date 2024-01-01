const mongoose = require('mongoose');
const passportLM = require('passport-local-mongoose');


const userSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    following: {
        type: Number,
        default: 0
    },
    pins: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pin',
    }],
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'board',
    }],
    dob: {
      type: Date,
    }
  });
  
  userSchema.plugin(passportLM);
  
  module.exports = mongoose.model("user", userSchema);
  