const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const routes = require("./routes/routes");

require("./config/passport");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());

app.use("/", cors(), routes);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
