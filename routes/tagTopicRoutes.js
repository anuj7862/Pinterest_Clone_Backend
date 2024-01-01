const express = require('express');
const tagTopicModel = require('../models/tagTopicModel');

const router = express.Router();

router.get('/getTagTopics', async (req, res) => {
   try { 
    const tagTopics = await tagTopicModel.find();
    res.status(200).json({tagList : tagTopics});
   }
   catch {
     res.status(500).json({error: "server error"});
   }
})


router.post('/createTagTopic', async (req, res) => {
    try {
        const name = req.body.name;
        const topic = new tagTopicModel({ name});
        const savedTopic = await topic.save();
        res.status(200).json({message: "tag topic saved", topic: savedTopic})
    }
    catch {
        res.status(500).json({error: "server error"});
    }
})

module.exports = router;