const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Require this so passport authentication works;
require("./auth/passportStrategies");

const registerUser = require("./routes/registerUser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());

app.use("/", cors(), registerUser);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
