const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const passport = require("passport");
const routes = require("./routes/routes");

require("./config/passport");

const { routeRequest } = require("./db");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());

// map object key/values to query and type of request:
// {getUsers: "SELECT * FROM users "}
let queryConfig = {
  name: "register-user",
  text: "INSERT INTO users(username, password, created_on) VALUES($1, $2, $3)",
  values: ["test@gmail.com", "password", new Date(1944, 10, 13)],
  rowMode: "array"
};
// let newDate = new Date(1944, 10, 13);
// let query =
//   "INSERT INTO users(username, password, created_on) VALUES('test@gmail.com', 'somePassword', newDate);";

app.use("/test", routeRequest(queryConfig));

// app.use("/", cors(), routes);

app.get("/users", (req, res, next) => {
  res.status(200);
  res.send({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
