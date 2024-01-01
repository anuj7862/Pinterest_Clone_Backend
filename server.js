const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

const connectDB = require('./dbConnect');
const authRoutes = require('./routes/authRoutes');
const pinRoutes = require('./routes/pinRoutes');
const User = require('./models/userModel');
const { PORT } = require('./config');

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

app.get('/', (req, res) => {
    res.send("Server is up");
})


app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
});