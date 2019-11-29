//
// index routes
//

const express = require("express"),
      router = express.Router({ mergeParams: true }),
      index_controller = require('../controllers/indexController'),
      shoppingCart_controller = require('../controllers/shopController');


// requiring middleware 
const middleware = require("../middleware/index");

// GET request for showing the  Landing page

router.get("/", index_controller.landing);

// POST request for adding products to User Wishlist

router.post("/home/search/addWishlist", index_controller.searchAddWishlist);

// GET request for 

router.get("/home/findProduct/:id", index_controller.findProduct);

// POST request for adding to the User ShoppingCart from Search page

router.post("/home/search/addShoppingCart" , index_controller.searchAddShoppingCart);

// GET request for displaying the Search Page 

router.get("/home/search" , index_controller.search);

// GET request for displaying the ForgotPassword page

router.get("/resetPassword/:username/:id", index_controller.resetPassword);

// PUT request for updating an user Password

router.post("/resetPassword/:username/:id" , index_controller.resetPasswordDelete);

// GET request for displaying the ForgotPassword Page

router.get("/forgotPassword" , index_controller.forgotPassword);

// POST request to send an recovery passwork link and email

router.post("/forgotPassword" , index_controller.forgotPasswordPost);

// GET request for verifying email

router.get("/:id" , index_controller.verifyEmail);

// GET request for displaying thr Checkout Page

router.get("/home/shoppingCart/checkOut", shoppingCart_controller.checkout);

// PUT request for updating the Verify status

router.put("/:id", index_controller.verifyEmailPut);

// POST request for updating the nr of likes of a product

router.post("/home/:id/:index/:productIndex/like",index_controller.productIndivLikePost);

// DELETE request for deleting a product from Wishlist

router.delete("/home/wishlist/:j/delete" , middleware.isLoggedIn, index_controller.wishlistDelete);

// POST request for adding a product from Wishlist to ShoppingCart , then deleting it

router.post("/home/wishlist/:j/add", middleware.isLoggedIn, index_controller.wishlistAdd);

// DELETE request for deleting a product from ShoppingCart

router.delete("/home/shoppingCart/:j/delete" ,middleware.isLoggedIn, shoppingCart_controller.shoppingCartDelete);

// GET request for displaying the USER shoppingCart

router.get("/home/shoppingCart",middleware.isLoggedIn, shoppingCart_controller.shoppingCart);

// POST request for adding the User shoppingCart

router.post("/home/:id/:index/:productIndex/add", middleware.isLoggedIn, shoppingCart_controller.shoppingCartAdd);

// GET request for displaying an USER wishlist

router.get("/home/wishlist", middleware.isLoggedIn, index_controller.wishlist);

// GET request for displaying Product Viewd History

router.get("/home/productHistory", middleware.isLoggedIn, index_controller.productHistory);

// DELETE request for deleting all productHistory

router.delete("/home/productHistory/delete", middleware.isLoggedIn, index_controller.productHistoryDelete);

// GET request for showing the Home page by ID , displaying a certain Category

router.get("/home/:id", middleware.isLoggedIn, index_controller.category_list);

// GET request for displaying the products of a certain Subcategory of a Category

router.get("/home/:id/:index", middleware.isLoggedIn, index_controller.category_subcategory);

// POST request for adding to the wishlist's user

router.post("/home/:id/:index" , middleware.isLoggedIn, index_controller.category_subcategoryPost);

// GET request for displaying details of a certain product

router.get("/home/:id/:index/:productIndex", middleware.isLoggedIn, index_controller.product);

// POST request for adding to the wishlist' user

router.post("/home/:id/:index/:productIndex", index_controller.wishlistPost);

module.exports=router;