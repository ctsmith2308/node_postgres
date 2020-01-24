const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post(
  "/test",
  passport.authenticate("signup", { session: false }),
  (req, res, next) => {
    res.json({
      message: "Signup successful"
    });
  }
);

module.exports = router;
