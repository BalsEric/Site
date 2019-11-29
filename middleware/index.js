//
//      Middlewares
//

// Middleware for checking if a user is logged In

exports.isLoggedIn=function (req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            }
            res.redirect('/login');
        }

// Middleware for checking the ownership of a review

exports.checkUserReview= function (req, res, next) {
    Category.findById(req.params.id, function (err, foundCategory) {
        if (err || !foundCategory) {
            console.log(err);
        } else if (foundCategory.subcategory[req.params.index].products[req.params.productIndex].reviews[req.params.reviewId].author.id.equals(req.user._id) ){
            next();
        } else {
           
            res.redirect("/home/" + req.params.id + "/" + req.params.index + "/" + req.params.productIndex);
        }
    });
}
 