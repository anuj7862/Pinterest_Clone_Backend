const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'board',
  },
  tags: {
    type: [Object],
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  allowComments: {
    type: Boolean,
    default: true,
  },
  showSimilar: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('pin', pinSchema);
