const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
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

// POST ROUTES
router.get(
  "/post/:id",
  passport.authenticate("jwt", { session: false }),
  postController.post_get
);

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postController.posts_get
);

module.exports = router;
