const express = require('express');
const passport = require('passport');

const localStrategy = require("passport-local");
const userModel = require('../models/userModel');


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
            res.status(200).json({ message: 'User registered successfully', user: registerUser });
          });
    })
    .catch((err) => {
        res.status(500).json({ error: err });
    })
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid email id or password' });
      }
      req.logIn(user, async (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        const userData = await userModel.findOne({emailId : user.emailId})
                                    .populate('pins');
                                    //.populate('boards');
        return res.status(200).json({ message: 'Login successful', user: userData });
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