const mongoose = require('mongoose');
const { USERNAME, PASSWORD } = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster1.vqkbc8y.mongodb.net/pinterestDBretryWrites=true&w=majority`)
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