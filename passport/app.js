const express = require('express');
const app = express();
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

// setup  app
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect(
  keys.mongodb.dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to mongodb')
);

// setup routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('App now listening for request on port 3000');
});
