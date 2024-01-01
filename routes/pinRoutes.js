const express = require('express');
const boardModel = require('../models/boardModel');
const Pin = require('../models/pinModel');
const userModel = require('../models/userModel');

const router = express.Router();

// Create a new pin
router.post('/createPin', async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      board,
      tags,
      allowComments,
      showSimilar,
      createdBy,
    } = req.body;

    const newPin = new Pin({
      title,
      description,
      image,
      board,
      tags,
      createdBy,
      allowComments,
      showSimilar,
    });
    
    const user = await userModel.findOne({_id : createdBy});
    if(user)
    {
        const savedPin = await newPin.save();
        user.pins.push(savedPin._id);
        user.save();
        //if board is there
        if(board){
            const boardId = await boardModel.findById(board);
            boardId.pins.push(savedPin._id);
            boardId.save();
        }
        res.status(201).json(savedPin);
    }
    else{
      res.status(500).json({error: "Invalid User"});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all pins
router.get('/getAllPins', async (req, res) => {
  try {
    const pins = await Pin.find();
    const response = {pins: pins};
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all pins by user ID
router.get('/getAllPinsByUserId/', async (req, res) => {
  try {
    const userId = req.query.userId;
    const pins = await Pin.find({ createdBy: userId });
    res.json(pins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a pin
router.delete('/deletePin/', async (req, res) => {
  try {
    const pinId = req.query.pinId;
    const userId = req.query.userId;

    const pin = await Pin.findById(pinId);

    if (!pin) {
      return res.status(404).json({ message: 'Pin not found' });
    }

    if (pin.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    await Pin.deleteOne({_id : pinId});
    res.json({ message: 'Pin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;