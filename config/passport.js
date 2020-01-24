const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
// const { getQuery } = require("./db");

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      // need to salt and hash the password
      let queryConfig = {
        name: "register-user",
        text: "INSERT INTO TABLE users(email, password) VALUES($1, $2)",
        values: [email, password]
      };
      try {
        let newUser = await getQuery(query);
        if (!newUser) {
          console.log("an error occured creating a new user");
        }
        return newUser;
      } catch (error) {
        done(error);
      }
    }
  )
);
