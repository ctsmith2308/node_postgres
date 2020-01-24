const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

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
