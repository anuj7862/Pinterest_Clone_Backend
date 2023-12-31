const mongoose = require('mongoose');
const passportLM = require('passport-local-mongoose');


const userSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
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
      ref: 'pins',
    }],
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'boards',
    }],
    dob: {
      type: Date,
    }
  });
  
  userSchema.plugin(passportLM);
  
  module.exports = mongoose.model("user", userSchema);
  