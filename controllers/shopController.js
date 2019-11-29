var Category = require('../models/category'),
    User = require('../models/user'),
    emailObj = require("../emailConfig"),
    Review = require("../models/review");


// displaying the User Shopping Cart

exports.shoppingCart= function(req,res){
        Category.find({}, function (err, categories) { // find all categories
            res.render("shoppingCart", {
                products: req.user.shoppingCart,
                categories: categories
            });
        });

}

// add a product to the User ShoppingCart

exports.shoppingCartAdd= function(req,res){
        Category.findById(req.params.id, function (err, category2) { // find category by ID
            if(err)
            {
                console.log(err);
            }
            req.user.shoppingCart.push(category2.subcategory[req.params.index].products[req.params.productIndex]);  // add product to the user shoopingCart array
            req.user.save();  // save the user
            var item = category2.subcategory[req.params.index].products[req.params.productIndex];  // store the product
            var html2 = '<h1>You added a new item to your ShoppingCart</h1><h3>' + item.name + '</h3><p>' + item.desc + '</p>' + '<img src="' + item.image + '"><p>$' + item.price + '</p>'; // create the cusmoted email
            emailObj.mailOptions.html = html2; // email settings
            emailObj.mailOptions.to = req.user.email;
            emailObj.send();
            console.log("successfully added");
            res.redirect("/home/" + req.params.id + "/" + req.params.index + "/" + req.params.productIndex);
        });
}

// deleting a product from thr User Shopping Cart

exports.shoppingCartDelete= function(req,res) {
    req.user.shoppingCart.splice(req.params.j, 1);  // delete a product from User ShoppingCart Array
    req.user.save();     //save the user
    res.redirect("/home/shoppingCart");
}

// displaying the Checkout Page

exports.checkout= function(req,res){
    res.render("checkout",{ products:req.user.shoppingCart});
}