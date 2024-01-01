const mongoose = require('mongoose');


const tagTopicSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('tagTopic', tagTopicSchema);