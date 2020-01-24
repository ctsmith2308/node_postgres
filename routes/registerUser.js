const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  (req, res, next) => {
    res.json({
      message: "Signup successful"
    });
  }
);

// router.post('/what', requestHandler)

module.exports = router;
