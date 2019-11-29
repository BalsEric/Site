var Category = require('../models/category'),
    User = require('../models/user'),
    emailObj = require("../emailConfig");

// Display not Found PAGE

exports.notFound = function(req,res){
    res.send("Page not found");
};

// Displaying ResetPassword Page

exports.resetPassword = function( req, res){
    res.render("resetPassword", { username:req.params.username , id:req.params.id});
}

// Updating the user new password

exports.resetPasswordDelete = function (req, res) {
    var username2 = req.params.username;
    User.findByUsername(username2).then(function(user2){
             if(user2){  // if user is found
                   user2.setPassword(req.body.password,function(){  // set new password
                        user2.save();   // save to database
                        res.redirect("/");
                });
                }
            else {
            console.log("not found");
            }
    });
}

// Display the ForgotPassword Page

exports.forgotPassword = function ( req,res ){
    res.render("forgotPassword");
}

// Sending email to a certain email for ResetingPassword

exports.forgotPasswordPost = function (req, res) {
    User.findOne({email:req.body.email}, function(err,Founduser){   // find the UNIQUE User with that email
     var html2 = '<h1>Password Reset Request</h1><a href="http://localhost:8080/resetPassword/' + Founduser.username + '/' + req.body.idConfirm + '">Link</a>';  // SEND confirmation email
     emailObj.mailOptions.html = html2;  // email settings
     emailObj.mailOptions.to = req.body.email;
     emailObj.send();
     
     res.redirect("/");
      });
}

// function for replacing characters

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// displaying the searched products

exports.search= function(req,res){
    Category.find( {} , function(err,categories){ // find all categories
        var productsSearched=[];
        var noMatch="";
        categories.forEach(function(category){  // loop through every category
            category.subcategory.forEach(function(subcategory){    // every subcategory
                subcategory.products.forEach(function(product){     //every product
                    if (req.query.search) {   // is there is a query
                        const regex = new RegExp(escapeRegex(req.query.search), 'gi');   // replace the characters
                            if(regex.test(product.name))     // verify if there are common characters
                            {
                                productsSearched.push(product);  // push the found product in order to display it
                              
                            }
                           
                    }
                });
            });
        });
        if (productsSearched.length < 1) {  // if none products found
            noMatch = "No products found for : '" + req.query.search +"' search";  // display a message instead of the products
        }
        res.render("search", {
            categories:categories,
            category:categories[0],
            products:productsSearched,
            noMatch: noMatch
        });
    });
}

var noMatch = null;


// Display the landing page

exports.landing = function (req, res) {
     Category.find({}, function (err, foundcategories) {  // get all categories
         if (err) {
             console.log(err);
         } else {
             res.render("landing", { categories: foundcategories });
         }
     });
};

// Displaying the Successfully Verify page

exports.verifyEmail = function(req,res){
     res.render("successfullyVerified",{ id:req.params.id});
}

// Updating the User database with TRUE to Verify

exports.verifyEmailPut = function(req,res){
    User.update({   // update the User's verify priority to TRUE
        id: req.params.id
    }, {
        $set: {
            'verify': 'true'
        }
    },
    function (err, user) {
        res.redirect("/");
    });
};

// Display the home page and all the categories

exports.category_list = function (req, res) {
    Category.find({}, function (err, categories) {  // get all categories
        Category.findById(req.params.id, function (err, foundCategory) {  // find the required category with that ID
            if (err) {
                console.log(err);
            } else {
                res.render("categoryIndiv", { category: foundCategory , categories: categories });
            }
        });
    });
};

// Display detail of a category

exports.category_subcategory = function (req, res) {
    Category.find({}, function (err, categories) { // find all categoires
        if (err) {
            console.log(err);
        }
         else 
         {
            Category.findById(req.params.id, function (err, foundCategory) {  // find the required category with that ID
                if (err) {
                    console.log(err);
                } else {
                    var subctg= foundCategory.subcategory[req.params.index];
                    res.render("subcategory", {
                        category: foundCategory,
                        categories: categories,
                        subctg: subctg,
                        index: req.params.index
                    });
                }
            });
        }
    });
};

// Displaying the Individual Product Page

exports.product = function(req,res) {
    Category.find({}, function (err, categories) {  // find all categories
        if (err) {
            console.log(err);
        } else {
            Category.findById(req.params.id, function (err, foundCategory) { // find the category with that ID
                if (err) {
                    console.log(err);
                } else {
                    var subctg = foundCategory.subcategory[req.params.index];
                    var product = subctg.products[req.params.productIndex];
                    var path = "/home/" + foundCategory._id + "/" + req.params.index + "/" + req.params.productIndex; // creating the viewed path
                    req.user.productHistory.push(path);  // add the path to the User ProductHistory array
                    req.user.save();  // save the user
                
                    res.render("individualProduct", {
                        category: foundCategory,
                        categories: categories,
                        subctg: subctg,
                        index:req.params.index,
                        productIndex:req.params.productIndex,
                        product:product
                    });
                }
            });
        }
    });
}

// Displaying the user WishlistS

exports.wishlist= function(req,res) {
    Category.find({}, function (err, categories) { // find all categories
         res.render("wishlist",{ products:req.user.wishlist , categories:categories});
});
}

// Adding to the User Wishlist from IndividualProduct Page

exports.wishlistPost= function(req,res) {
    if(req.body.check!="."){  // foolish checking if it was clicked or not 
        Category.findById(req.params.id , function(err,category2){ // find the category with that ID
            if(err)
            {
                console.log(err);
            }
            req.user.wishlist.push(category2.subcategory[req.params.index].products[req.params.productIndex]); // add the product to the User Wishlist
            req.user.save(); // save the user
            var item = category2.subcategory[req.params.index].products[req.params.productIndex]; // save the product into a var
             var html2 = '<h1>You added a new item to your Wishlist</h1><h3>'+item.name+'</h3><p>'+item.desc+'</p>'+'<img src="'+item.image+'"><p>$'+item.price+'</p>'; // creating the email content
             emailObj.mailOptions.html = html2; // email settings
             emailObj.mailOptions.to = req.user.email;
             emailObj.send();
             console.log("successfully added"); 
            res.redirect("/home/" + req.params.id + "/" + req.params.index + "/" + req.params.productIndex);
        });
        
    }
    
    
}

// Deleting a product form User wishlist

exports.wishlistDelete= function(req,res){
    req.user.wishlist.splice(req.params.j,1);  // deleting a product from the User Wishlist
    req.user.save();   // save the user
    res.redirect("/home/wishlist");
}

// Adding a product to the User shopping cart from the Wishlist and deleting from Wishlist

exports.wishlistAdd = function(req,res){
    req.user.shoppingCart.push(req.user.wishlist[req.params.j]); // add a product to the User ShoppingCart
    req.user.wishlist.splice(req.params.j,1);   // deleting the same product from the User Wishlist
    req.user.save();  // save the user
    res.redirect("/home/wishlist");
}

// Adding to the User Wishlist from the Subcateogry Page

exports.category_subcategoryPost= function(req,res){
    if (req.body.check != ".") {   // another foolist checking ...
        {
                Category.findById(req.params.id, function (err, category) {     // find the category by ID
                    req.user.wishlist.push(category.subcategory[req.params.index].products[req.body.i]); // adding the product to the User Wishlist
                    req.user.save();   // save
                    var item = category.subcategory[req.params.index].products[req.body.i]; // save the product into a var
                    var html2 = '<h1>You added a new item to your Wishlist</h1><h3>' + item.name + '</h3><p>' + item.desc + '</p>' + '<img src="' + item.image + '"><p>$' + item.price + '</p>'; // creating the customed email content
                    emailObj.mailOptions.html = html2; // email settings
                    emailObj.mailOptions.to = req.user.email;
                    emailObj.send();
                    console.log("successfully added");
                    res.redirect("/home/" + req.params.id + "/" + req.params.index );
            });

        }
    } else {
        console.log("nor working");
    }
}

// Displaying Product Viewed History Page

exports.productHistory = function(req,res) {
    Category.find({}, function (err, categories) { // find all categories
         Category.findById(req.params.id, function (err, category) { // find the category by ID
            res.render("productHistory", { category:category,categories,categories,paths:req.user.productHistory});
         });
    });
}

// Deleting the productViewed History

exports.productHistoryDelete= function(req,res) {
    req.user.productHistory=[];  // delete all elements from the ProductHistory array
    req.user.save();  // save the user
    res.redirect("/home/productHistory");
}

// Updating a product like number

exports.productIndivLikePost = function(req,res) {
    Category.find({}, function (err, categories) {   // find all categories
                if (err) {
                    console.log(err);
                } else {
                    Category.findById(req.params.id, function (err, foundCategory) {  // find category by ID
                                if (err) {
                                    console.log(err);
                                } else {
                                   if(req.body.like ==="liked")   // if already Liked
                                   {
                                        for (var k = 0; k <= foundCategory.subcategory[req.params.index].products[req.params.productIndex].nrLikes.length-1;k++){ // loop though each Like
                                            if (foundCategory.subcategory[req.params.index].products[req.params.productIndex].nrLikes.likedBy === req.user.username)  // find the position where the CurrentUser liked
                                            {
                                                foundCategory.subcategory[req.params.index].products[req.params.productIndex].nrLikes.splice(k,1);  // delete the User's Like
                                                break;
                                            }
                                        }
                                   }
                                   else {
                                        foundCategory.subcategory[req.params.index].products[req.params.productIndex].nrLikes.push({  // add a new Like to the Product
                                            nrLike: 1,
                                            likedBy: req.user.username
                                        });
                                   }
                                    
                                    foundCategory.save();
                                    res.redirect( "/home/" + foundCategory._id + "/" + req.params.index + "/" + req.params.productIndex);
                                }});}});}

// Adding Products to the wishlist from Search page

exports.searchAddWishlist = function(req,res){
    var product2={  // create a new product from the body
        name:req.body.name,
        desc:req.body.desc,
        image:req.body.image,
        price:req.body.price
    };
    req.user.wishlist.push(product2);  // add it to the wishlist
    req.user.save();  // save the user
    res.redirect("back");
}

// adding to the shoppingCart from the Search page

exports.searchAddShoppingCart = function (req, res) {
    var product2 = {   // create a new product from the body
        name: req.body.name,
        desc: req.body.desc,
        image: req.body.image,
        price: req.body.price
    };
    req.user.shoppingCart.push(product2);   // add to the shoppingCart
    req.user.save();   // save
    res.redirect("back");
}

// redirecting user to the product from Search page

exports.findProduct = function(req,res) {
    Category.find ( {}, function(err, categories){   // find all categories
        if(err)
        {
            console.log(err);
        }else {
            var l=-1;
            for(l=0;l<=categories.length-1;l++){  // loop through each and every one
                for(var m=0;m<=categories[l].subcategory.length-1;m++){
                    for(var n=0;n<=categories[l].subcategory[m].products.length-1;n++){
                        if (categories[l].subcategory[m].products[n]._id.equals(req.params.id))  // if IDs Match
                        {
                            res.redirect("/home/"+categories[l]._id+"/"+m+"/"+n);  // redirect the User to the Product Page
                        }
                    };
                };
            };
        }
    });
}