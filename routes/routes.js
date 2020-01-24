const express = require("express");
const passport = require("passport");
// const localStrategy = require("passport-local").Strategy;
// const jwt = require("jsonwebtoken");
const cors = require("cors");

const router = express.Router();

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post("/signup", passport.authenticate("signup"), (req, res, next) => {
  console.log("here i am in the router!!!!");
  res.json({
    message: "Signup successful"
    // user: req.user
  });
});


module.exports = router;
