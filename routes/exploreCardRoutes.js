const express = require('express');
const exploreCardModel = require('../models/exploreCardModel');

const router = express.Router();

router.post('/createExploreCard', async (req, res) => {
    try {
        const {image, title, description, date } = req.body;

        const card = new exploreCardModel({
            image, 
            title,
            description,
            date
        });
        const savedCard = await card.save();
        res.status(200).json({message: 'card created', explorecard: savedCard})
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/getExploreCards', async (req, res) => {
    try {
        const date = req.query.date;
        const result = await exploreCardModel.aggregate([
            {
              $match: {
                date: date, // Replace with your desired date
              },
            },
            {
              $group: {
                _id: '$date', // Group by the date field
                cards: {
                  $push: {
                    _id : '$_id',
                    title: '$title',
                    image: '$image',
                    description: '$description',
                  },
                },
              },
            },
          ]);
        const allData = await exploreCardModel.find();
        res.status(200).json({message : `explore cards for date ${date}`, dateWiseCards : result});
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
})

module.exports = router;

