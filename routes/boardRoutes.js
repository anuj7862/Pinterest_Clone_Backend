const express = require('express');
const Board = require('../models/boardModel');
const userModel = require('../models/userModel');

const router = express.Router();


// Create a new board
router.post('/createBoard', async (req, res) => {
    try {
      const {
        name,
        isLocked,
        createdBy,
      } = req.body;
  
      const newBoard = new Board({
        name,
        isLocked,
        createdBy,
      });
  
      const user = await userModel.findOne({_id : createdBy});
      if(user)
      {
        const savedBoard = await newBoard.save();
        user.boards.push(savedBoard._id);
        user.save();
        res.status(201).json( {message: 'board Created', board : savedBoard});
      }
      else{
        res.status(500).json({error: "Invalid User"});
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
  
  // Get all boards
  router.get('/getAllBoards', async (req, res) => {
    try {
      const boards = await Board.find();
      const response = {boards: boards};
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
  
  // Get all boards by user ID
  router.get('/getAllBoardsByUserId/', async (req, res) => {
    try {
      const userId = req.query.userId;
      const boards = await Board.find({ createdBy: userId });
      res.status(200).json({boards : boards});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
  
  // Delete a board
  router.delete('/deleteBoard/', async (req, res) => {
    try {
      const boardId = req.query.boardId;
      const userId = req.query.userId;
  
      const board = await Board.findById(boardId);
  
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
  
      if (board.createdBy.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'Permission denied' });
      }
  
      await Board.deleteOne({_id: boardId});
      res.json({ message: 'Board deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
  
  module.exports = router;