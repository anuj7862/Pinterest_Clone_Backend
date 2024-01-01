const mongoose = require('mongoose');


const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pin',
    }],
    isLocked: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
});

module.exports = mongoose.model('board', boardSchema);