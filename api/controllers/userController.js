const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.user_get = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).exec();

  res.json({ user });
});

exports.users_get = asyncHandler(async (req, res, next) => {
  const users = await User.find({}).exec();
  res.json({ users });
});

exports.user_create = [
  body("fullName")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Name too short"),

  body("username")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Username too short")
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("Username already in use!");
      }
    }),

  body("email")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Enter valid email address")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new Error("Email address is already in use!");
    }),

  body("password")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Password too short"),

  body("confirmPassword")
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("Passwords must match!");
      return true;
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const { fullName, password, username, email } = req.body;

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log(err);
      } else {
        const user = new User({
          username,
          fullName,
          password: hashedPassword,
          email,
        });

        if (!errors.isEmpty()) {
          res.json({ errors: errors.array() });
          return;
        } else {
          await user.save();
          res.json({ message: "User created successfully" });
        }
      }
    });
  }),
];

exports.login_user = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred");
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        jwt.sign({ user: req.user }, "secretkey", (err, token) => {
          res.json({ token, user: JSON.stringify(req.user) });
        });
      });
    } catch (err) {
      return next(error);
    }
  })(req, res, next);
});

exports.logout_user = (req, res, next) => {
  req.logout(function (err) {
    if(err) {
      console.log(err)
      return next(err)
    }
    res.json({message: "Successfully logged out"})
  })
}