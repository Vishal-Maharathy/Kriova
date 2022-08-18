const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const mailer = require('../config/nodemailer')
const jwt = require('jwt-simple');


module.exports.homeController = async(req, res)=>{
    res.render('index.ejs');
}
module.exports.login = async(req, res)=>{
    res.render('login.ejs');
}
module.exports.signup = async(req, res)=>{
    res.render('register.ejs');
}
module.exports.authenticate = async (req, res)=>{
    let user = await User.findOne({email:req.body.email})
    if(!user){
        //send a flash that the user is not in registered!
        req.flash('success', 'User Not Registered, Please Register First');
        return res.redirect('/signup');
    }
    if(await bcrypt.compare(req.body.password, user.password)){
        //send a flash for logging in successfully
        req.flash('success', 'Logged In Successfully');
        return res.render('loggedIn.ejs')
    }else{
        // send a flash for wrong password entered
        req.flash('error', 'Wrong Password Entered!');
        console.log("Wrong Password")
    }
    return res.redirect('back')
}
module.exports.register = async (req, res)=>{
    if(req.body.password!=req.body.cpassword){
        //send a flash that password is not same
        req.flash('error', 'Password Not Matching!');
        return res.redirect('back')
    }
    let user = await User.findOne({email:req.body.email})

    //send a flash that the user is already registered, log in now
    if(user){
        req.flash('success', 'User Already Registerd, Login Please!');
        return res.redirect('login')
    }
    else{
        User.create(req.body, async (err, user)=>{
            console.log("Error in creating user", err)
            user.password = await bcrypt.hash(req.body.password, 10);
            user.save();
        })
    }
    //send a message saying that the user has been registered.
    req.flash('success', 'User Registerd Successfully, Login Please!');
    return res.redirect('login');
}
module.exports.forgotPassword = async(req, res)=>{
    res.render('forgotPassword.ejs');
}
module.exports.resetPassword = async(req, res)=>{
    let payload = {
        email:req.body.email,
    }
    let user = await User.findOne({email:req.body.email});
    if(!user){
        //no user found with given email
        req.flash('error', 'No User Found With Provided Email');
        return res.redirect('back');
    }
    var token = jwt.encode(payload, process.env.secret);
    const resetLink = process.env.hostURL+'/redirectUpdatePass/'+token
    mailer({
        email: req.body.email,
        link: resetLink
    })
    req.flash('success', 'Reset Email Sent');
    res.redirect('login');
}
module.exports.renderResetPage = async(req, res)=>{   
    res.render('resetPassword.ejs', {token: req.params.token});
}
module.exports.updatePassword = async (req, res)=>{
    let data = jwt.decode(req.params.token, process.env.secret);
    if(req.body.password!=req.body.cpassword){
        //send a flash password do not match
        req.flash('error', 'Password Does Not Match!');
        return res.redirect('back');
    }
    let user = await User.findOne({email:data.email});
    user.password = await bcrypt.hash(req.body.password, 10);
    user.save();
    //flash saying password changed succesfully
    req.flash('success', 'Password Updated Successfully!');
    return res.redirect('/login');
}