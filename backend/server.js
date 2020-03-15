const express = require('express');
const cors = require('cors');
const mongoose = require(`mongoose`);

require('dotenv').config();

const app = express();
const port = process.env.PORT || 63448;
const uri = 'mongodb://haoyangLi:519518lhy@ds263448.mlab.com:63448/heroku_fnq00qb5';

app.use(cors());
app.use(express.json());


mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});