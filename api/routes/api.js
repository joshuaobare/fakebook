const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const friendController = require("../controllers/friendController");
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

router.put(
  "/user/:id/request",
  passport.authenticate("jwt", { session: false }),
  friendController.friend_request
);

router.put(
  "/user/:id/friend",
  passport.authenticate("jwt", { session: false }),
  friendController.add_friend
);

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

router.get(
  "/user/:id/posts" ,
  passport.authenticate("jwt", { session: false }),
  postController.user_posts_get
)

router.put (
  "/post/:id/like",
  passport.authenticate("jwt", { session: false }),
  postController.like_post
)

router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  postController.create_post
)

router.delete(
  "/post/:id",
  passport.authenticate("jwt", { session: false }),
  postController.delete_post
)

// COMMENT ROUTES
router.get(
  "/post/:id/comments",
  passport.authenticate("jwt", { session: false }),
  commentController.comments_get
);

router.post(
  "/post/:id/comment",
  passport.authenticate("jwt", { session: false }),
  commentController.create_comment
);

module.exports = router;
