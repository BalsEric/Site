var User = require('../models/user'),
    Category = require('../models/category'),
    emailObj = require("../emailConfig");

// Display the profilePage

exports.profile = function (req, res) {
    Category.find( {} , function( err, categories){  // find all the categories
        res.render("profile", {categories:categories});
    });
    
};

// Displaying the AddNewAdress Page

exports.addNewAdress= function(req,res) {
    res.render("addNewAdress");
}

// adding new adress to the user database

exports.addNewAdressPost = function(req,res){
    var adress = {  // create a new Adress Object
        Street:req.body.street,
        Number:req.body.number,
        ApartmentNr:req.body.apartNr,
        City:req.body.city,
        Country:req.body.country,
        PostalCode:req.body.postalCode
    }
    req.user.shippingAdresses.adresses.push(adress);  // add the adress Object to the User Adresses Array
    if(req.user.shippingAdresses.adresses.length==1){ // if it's the first adress
        req.user.shippingAdresses.current=adress;  // set it to the currentOne
    }
    req.user.save(); // save user
    res.redirect("/home/profile");
}

// Displaying the AddBalance page

exports.addBalance = function(req,res){
    res.render("addBalance");
}

// Adding money to the UserDatabase

exports.addBalancePost= function(req,res){
    req.user.balance= parseInt(req.user.balance,10) + parseInt(req.body.amount,10); // update the User Balance
    req.user.save();   // save
    res.redirect("/home/profile");
}

// Reseting the User Balance

exports.resetBalance = function(req,res){
    req.user.balance=0; // reset the User Balance to 0
    req.user.save();   // save
    res.redirect("/home/profile");
}

//  Buying route

exports.bought = function(req,res){
    var money=0;
    req.user.shoppingCart.forEach(function(product){
        money=money+parseInt(product.price,10); // calculating the total Price for all shoppingCart products
    });
    if(req.user.reputation >9 && req.user.reputation<100){ // reducere
        money=money-money*10/100; // applying the fee
    }
    if (req.user.balance - money >0)  // if user has enough money
    {
        req.user.pastOrders.push(req.user.shoppingCart);   // add the ShoopingCart Array to the PastOrder Array
        req.user.reputation = parseInt(req.user.reputation, 10) + parseInt(req.user.shoppingCart.length, 10); // add to Reputation
        req.user.balance = req.user.balance - money;   // take the money from the User
        var html2 = '<h1>Thank you for buying !</h1><p>Products</p>' ;  // create customed email
        for(var i=0;i<=req.user.shoppingCart.length-1;i++){
            html2 += '<p>'+req.user.shoppingCart[i].name+'<span> ,  '+req.user.shoppingCart[i].price+' </span> </p>'; // add items to the email
        }
        emailObj.mailOptions.html = html2; // email settings
        emailObj.mailOptions.to = req.user.email;
        emailObj.send();
        req.user.shoppingCart = [];   // deleting all elements form the shoppingCart
        req.user.save();  // save user
        res.render("successfullyBought");
    }
    else {
        res.send("Not enough money");
    }
}