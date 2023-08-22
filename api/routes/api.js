const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// USER ROUTES
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  userController.users_get
);

router.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  userController.user_get
);

router.post("/user", userController.user_create);

router.post("/login", userController.login_user);

router.post("/logout", userController.logout_user);

module.exports = router;
