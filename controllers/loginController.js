var passport = require("passport"),
    Category = require('../models/category');

// Displaying login Page

exports.login = function(req,res){
    res.render("login");
};

// Cheking the user credits

exports.loginPost=
    passport.authenticate("local", 
    {
    successRedirect: "/home/5d112e4bacba30ba70a6ec1a",
    failureRedirect: "/login"
}), function (req, res){
    console.log("logged in");}

// Logout the user

exports.logout= function (req, res) {
    req.logout();
    res.redirect("/");
};