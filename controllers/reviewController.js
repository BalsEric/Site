var Category = require('../models/category'),
    User = require('../models/user'),
    emailObj = require("../emailConfig"),
    Review = require("../models/review");

// Display the Add new Review page

exports.addReviewGet = function(req,res) {
    Category.find({}, function (err, categories) {   // find all the categories
        if (err) {
            console.log(err);
        } else {
            Category.findById(req.params.id, function (err, foundCategory) {  // find the category by ID
                if (err) {
                    console.log(err);
                } else {
                    var subctg = foundCategory.subcategory[req.params.index];
                    var product = subctg.products[req.params.productIndex];

                    res.render("newReview", {
                        category: foundCategory,
                        categories: categories,
                        subctg: subctg,
                        index: req.params.index,
                        productIndex: req.params.productIndex,
                        product: product
                    });
                }
            });
        }
    });
}

// Add to the database a new review

exports.addReviewPost = function (req, res) {
    Category.findById(req.params.id, function (err,foundcategory) {  // find category by ID
        if(err)
        {
            console.log(err);
        }
        else {
        Review.create( {  // create a new REVIEW
            text: req.body.review ,
            rate : req.body.rate
        },function(err,review){
            if(err)
            {
                console.log(err);
            }
            else {
            review.author.id = req.user._id; // adding the author
            review.author.username= req.user.username;
            review.save();  // save the review
            foundcategory.subcategory[req.params.index].products[req.params.productIndex].reviews.push(review);  // add the review to the Product Review array
            foundcategory.save();  // save the category
            res.redirect("/home/" + foundcategory._id + "/" + req.params.index + "/" + req.params.productIndex);
            }
        });
    }
    });

}

// Delete a review

exports.reviewDelete =  function (req, res) {
   
    Category.findById( req.params.id, function (err,category2) {  // find category by ID
        if (err) {
            console.log(err)
            res.redirect('/');
        } else {
            var rv = category2.subcategory[req.params.index].products[req.params.productIndex].reviews[req.params.reviewId]._id; // saving the review ID
            category2.subcategory[req.params.index].products[req.params.productIndex].reviews[req.params.reviewId].remove();  // deleting the review from the Product Review Array
            category2.save();  // save category
            
            Review.findById(rv, function (err, review2) {   // find the Review bu the saved ID
                review2.remove();  // remove the review
                 res.redirect("/home/" + req.params.id+"/"+req.params.index+"/"+req.params.productIndex);
            });
            
        }
});
}

// Display the reviewEdit page

exports.reviewEdit = function( req,res) {
    Category.find({} , function(err,categories){ // find all the categories
        Category.findById( req.params.id, function (err, category2) { // find the cateogry by ID
            if (err) {
                console.log(err)
                res.redirect('/');
            } else {
                var rv = category2.subcategory[req.params.index].products[req.params.productIndex].reviews[req.params.reviewId]._id; // save the review ID
                

                Review.findById(rv, function (err, review2) {  // find the review by the saved ID
                    res.render("reviewEdit", {
                        category: category2,
                        categories: categories,
                        index: req.params.index,
                        productIndex: req.params.productIndex,
                        review: review2,
                        reviewId: req.params.reviewId
                    });
                });
            }
        });
    });
}

// Update to the database the edited review

exports.reviewPut =  function (req, res) {
    Category.findById(req.params.id,function (err, category2) {  // find the category by ID
        if (err) {
            console.log(err);
            res.render("edit");
        } else {
            
            category2.subcategory[req.params.index].products[req.params.productIndex].reviews[req.params.reviewId].text=req.body.review; // update the review text
            category2.subcategory[req.params.index].products[req.params.productIndex].reviews[req.params.reviewId].rate = req.body.rate;  // update the review rate
            var rv = category2.subcategory[req.params.index].products[req.params.productIndex].reviews[req.params.reviewId]._id; // store the ID
            category2.save(); // save the category

            Review.findById(rv, function (err, review2) {  // find review after the stored ID
                    review2.text= req.body.review; // update it here as well
                    review2.rate =req.body.rate;
                    review2.save();   // save the review
                   res.redirect("/home/" + req.params.id + "/" + req.params.index + "/" + req.params.productIndex);
                });
        }
    });
};
