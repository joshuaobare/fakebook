const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")

// USER ROUTES
router.get("/users", userController.users_get)

router.get("/user/:id", userController.user_get)

router.post("/user", userController.user_create)

module.exports = router