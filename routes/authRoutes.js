const express = require('express');
const passport = require('passport');

const localStrategy = require("passport-local");


const User = require('../models/userModel');
const router = express.Router();

passport.use(new localStrategy(User.authenticate()));


router.post('/signup', async (req, res) => {
    console.log(req.body);
    const { emailId, password, dob, username, name } = req.body;
    const newUser = new User({ emailId , dob, username, name });
    User.register(newUser, password)
    .then((registerUser) => {
        passport.authenticate("local")(req, res, () =>{
            res.status(201).json({ message: 'User registered successfully' });
          });
    })
    .catch((err) => {
        res.status(500).json({ message: err });
    })
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!user) {
        return res.status(401).json({ message: 'Invalid email id or password' });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'Login successful', user: req.user });
      });
    })(req, res, next);
  });

  router.get('/logout', async (req, res) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        res.status(200).json({message: 'Logout successful'});
    })
  });

  module.exports = router;