var User = require('../models/user'),
    passport = require("passport"),
    Category = require('../models/category'),
    emailObj = require("../emailConfig");

// Displaying the Register Page

exports.register= function (req, res) {
    res.render("register");
};

// Registering a new user to the database + send confirmation email

exports.registerPost= function (req, res) {
    Category.find({}, function (err, categories) {  // find all categories
   var successR = "/home/" + categories[0]._id;
    User.register(new User({    // add new User to the database
        username: req.body.username ,
        email : req.body.email,
        id:req.body.idConfirm,
        verify:false
    }), req.body.password, function (err, user) {
        if (err) {
            res.render("register");
        } else {
            var html2 = ' <h2>Welcome and Thank you for Signing Up!</h2> <p>Please click the following link in order to confirm your accout</p> <p><a href="http://localhost:8080/' + req.body.idConfirm + '">Link for confirm</a></p>';  // create email confirmation content
            emailObj.mailOptions.html= html2;  // email settings
            emailObj.mailOptions.to=req.body.email;
            emailObj.send();
           
            passport.authenticate("local")(req, res, function () {  // authenticate the user
                res.redirect(successR);
            });
        }
    });
});
}