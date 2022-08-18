const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();
const connectDB = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware');
const flash = require('express-flash')
const session = require('express-session');
// flash messages
app.use(session({
    secret:'testSecret',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
let setFlash = function(req, res, next){
    res.locals.flash = {
        //what kind of flash message to flash(succes type(green), error type(red) is being set up here)
        success : req.flash('success'),
        error : req.flash('error')
    }
    next();
}
app.use(setFlash);

app.use(express.urlencoded({ extended: false }));
app.set('view-engine', 'ejs');
app.use(express.json());

// setup for css files
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'assets/scss'),
    dest: path.join(__dirname, 'assets/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:'/css'
}));
app.use(express.static('assets'));

// connect to mongoose server
connectDB();

//router
app.use('/', require('./routes'));

const port = process.env.PORT;
app.listen(port);