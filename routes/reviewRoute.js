//
// REVIEW Route
//

const express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    review_controller = require('../controllers/reviewController');

//middleware
const middleware = require("../middleware/index");

// GET request for diplaying the EDIT review page

router.get("/home/:id/:index/:productIndex/reviews/:reviewId/edit",middleware.isLoggedIn, review_controller.reviewEdit);

// PUT request for updating the review in Category and Review Database

router.put("/home/:id/:index/:productIndex/reviews/:reviewId/edit", middleware.isLoggedIn,review_controller.reviewPut);

// GET request for displaying the ADD new Review page

router.get("/home/:id/:index/:productIndex/addReview", middleware.isLoggedIn,  review_controller.addReviewGet);

// GET request for add a new review to Category and Review database

router.post("/home/:id/:index/:productIndex/addReview", middleware.isLoggedIn, review_controller.addReviewPost);

// DELETE request to delete a review

router.delete("/home/:id/:index/:productIndex/reviews/:reviewId", middleware.isLoggedIn, middleware.isLoggedIn, review_controller.reviewDelete);

module.exports= router;