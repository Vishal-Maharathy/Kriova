const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();
const connectDB = require('./config/mongoose');
const nodeMailer = require('./config/nodemailer');

app.use(express.urlencoded({ extended: false }));
app.set('view-engine', 'ejs');
app.use(express.json());

// connect to mongoose server
connectDB();

//router
app.use('/', require('./routes'));

const port = process.env.PORT;
app.listen(port);