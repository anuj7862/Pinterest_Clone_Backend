require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

const connectDB = require('./dbConnect');

const authRoutes = require('./routes/authRoutes');
const pinRoutes = require('./routes/pinRoutes');
const boardRoutes = require('./routes/boardRoutes');
const tagTopicRoutes = require('./routes/tagTopicRoutes');
const exploreCardRoutes = require('./routes/exploreCardRoutes');

const User = require('./models/userModel');
const PORT = process.env.PORT;

const app = express();
connectDB(); //db connection

//express middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//passport middleware
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    })
  );
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes for auth
app.use('/auth', authRoutes);
app.use('/pin', pinRoutes);
app.use('/board',boardRoutes);
app.use('/topic',tagTopicRoutes);
app.use('/exploreCard', exploreCardRoutes);

app.get('/', (req, res) => {
    res.send("Server is up");
})


app.listen( PORT, () => {
    console.log(`server is running on port : ${PORT}`);
});