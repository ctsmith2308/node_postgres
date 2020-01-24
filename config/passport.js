const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const { submitQuery } = require("../db");
const queryConstants = require("../db/queries/constants");

let constants = {
  REGISTER_NEW_USER: "REGISTER_NEW_USER"
};

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    async (email, password, done) => {
      let query = userAuthQueryFactory(
        constants.REGISTER_NEW_USER,
        email,
        password
      );
      try {
        let newUser = await submitQuery(query);
        return done(null, newUser);
      } catch (error) {
        console.log("Signup Passport Strategy error ==>", error.message);
        done(error);
      }
    }
  )
);

let userAuthQueryFactory = (queryName, ...args) => {
  let queryList = {
    REGISTER_NEW_USER: {
      text: queryConstants[queryName],
      values: [...args, new Date(1944, 10, 13)],
      rowMode: "array"
    }
  };
  return queryList[queryName];
};
