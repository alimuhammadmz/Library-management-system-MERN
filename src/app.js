const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json())                     // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())                     // for parsing cookie from requests

const userRouter = require('./routes/userRouter.js');
const bookRouter = require('./routes/bookRouter.js');

app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);
//app.use('/api/abc-xyz', abcRouter);

module.exports = app;