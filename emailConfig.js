var nodemailer = require('nodemailer');

var emailObj= {};
emailObj.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

emailObj.mailOptions = {
    from: '',
    to: '',
    subject: 'Testing',
    html: ''
};


emailObj.send = function () {
        emailObj.transporter.sendMail(emailObj.mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }});
 }

 module.exports=emailObj;

