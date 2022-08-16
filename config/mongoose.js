const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect(process.env.DATABASE_URL);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
    db.once('open', function () {
        console.log('Connected to Database :: MongoDB');
    });
}

module.exports = connectDB;