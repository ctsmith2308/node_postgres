var bcrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const {
  REGISTER_NEW_USER,
  LOGIN_USER
} = require("../db/queryUtils/queryConstants/userAuthConstants");

const {
  buildQueryConfig
} = require("../db/queryUtils/queryBuilders/queryBuilder");

const { executeQuery } = require("../db/queryUtils");

const hashPassword = (password) => await new Promise((resolve, reject) => {
    bcrypt.hash(password, process.env.SALT_ROUNDS, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  })

const authenticateSignup = async (email, password, done) => {
  try {
    let query = buildQueryConfig(REGISTER_NEW_USER, email, hashPassword(password));
    let newUser = await executeQuery(query);
    return done(null, newUser);
  } catch (error) {
    console.log("Signup Passport error ==>", error.message);
    done(error);
  }
};

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    authenticateSignup
  )
);

const authenticateLogin = async (email, password, done) => {
  let emailQuery = buildQueryConfig(LOGIN_USER, email);
  try {
    let user = await executeQuery(emailQuery);
    if (!user) return done(null, false, { message: "User not found" });
    let match = await bcrypt.compare(user, password);
    if (!match) return done(null, false, { message: "Invalid Password" });
    return done(user);
  } catch (error) {
    console.log("Login Passport error ==>", error.message);
    done(error);
  }
};

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    authenticateLogin
  )
);
