//
// Register routes
//

const express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    register_controller = require('../controllers/registerController');

// GET request for displaying the REGISTER page

router.get("/register", register_controller.register);

// POST request for updating the USER collection

router.post("/register", register_controller.registerPost);

module.exports = router;