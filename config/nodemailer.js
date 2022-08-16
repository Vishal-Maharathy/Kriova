const nodemailer = require("nodemailer");
``
const transporter = nodemailer.createTransport({
    service: process.env.mailerService,
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.mailerUser,
        pass: process.env.mailerPass
    },
});

//for sending mails for forgetting mails;
const sendMail = (data) => {
    //test mail
    transporter.sendMail({
        from: 'supmind76@gmail.com',
        to: data.email,
        subject: 'Password Reset Link',
        html: `Please click on the given link to reset your password: ${data.link}`
    }, (err)=>{
        console.log("NodeMailer error", err);
    })
}

module.exports = sendMail;