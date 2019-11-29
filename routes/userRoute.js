//
// User routes
//

const express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    user_controller = require('../controllers/userController');

const middleware = require("../middleware/index");

// GET request for reseting User Balance

router.get("/home/resetBalance", user_controller.resetBalance);

// GET request for displaying profile page

router.get("/home/successfullyBought", user_controller.bought);

// GET request for displaying the Profile Page

router.get("/home/profile" ,middleware.isLoggedIn, user_controller.profile);

// GET request for displaying the AddBalance page

router.get("/home/addBalance" ,user_controller.addBalance);

// POST request for adding money to the User Balance

router.post("/home/profile/addBalance" , user_controller.addBalancePost);

// GET request for displaying the AddNewAdress page

router.get("/home/profile/addNewAdress" , middleware.isLoggedIn , user_controller.addNewAdress);

// POST request for adding the new adress to the User Database

router.post("/home/profile/addNewAdress" , middleware.isLoggedIn, user_controller.addNewAdressPost);

module.exports= router;