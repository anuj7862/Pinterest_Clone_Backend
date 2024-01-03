require('dotenv').config();
const mongoose = require('mongoose');
//const { USERNAME, PASSWORD } = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster1.vqkbc8y.mongodb.net/pinterestDB?retryWrites=true&w=majority`)
    .then( () =>
            {console.log("Connected to database")
    }).catch (() => {
            console.log("Error connecting to database");
    })
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

module.exports = connectDB;