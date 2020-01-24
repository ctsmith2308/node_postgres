const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const {
  REGISTER_NEW_USER
} = require("../db/queryUtils/queryConstants/userAuthConstants");

const {
  authenticationQueryFactory
} = require("../db/queryUtils/queryBuilders/queryBuilder");

const { executeQuery } = require("../db/queryUtils");

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    async (email, password, done) => {
      let query = authenticationQueryFactory(
        REGISTER_NEW_USER,
        email,
        password
      );
      try {
        let newUser = await executeQuery(query);
        return done(null, newUser);
      } catch (error) {
        console.log("Signup Passport Strategy error ==>", error.message);
        done(error);
      }
    }
  )
);
