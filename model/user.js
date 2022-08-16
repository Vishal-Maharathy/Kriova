const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    pinCode: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    resetToken:{
        type:String
    }
});

const user = mongoose.model('User', userSchema);
module.exports = user;