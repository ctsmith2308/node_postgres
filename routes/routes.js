const express = require("express");
const passport = require("passport");
const router = express.Router();
const { routeRequest } = require("../db");

let constants = {
  REGISTER_NEW_USER: "REGISTER_NEW_USER"
};

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  (req, res, next) => {
    res.json({
      message: "Signup successful"
    });
  }
);

router.post("/test", routeRequest(constants.REGISTER_NEW_USER));

module.exports = router;
