require("dotenv").config();
const { Pool } = require("pg");
const queryConstants = require("../db/queries/constants");
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
});

const acquirePoolConnection = async () => {
  try {
    return await pool.connect();
  } catch (error) {
    console.log("Error acquiring client pool ==> ", error.stack);
    throw error;
  }
};

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

const submitQuery = async query => {
  try {
    const client = await acquirePoolConnection();
    client.release();
    return await client.query(query);
  } catch (error) {
    console.log("Error executing query ==> ", error.stack);
    throw error;
  }
};

const requestParserFactory = (queryName, req) => ({
  REGISTER_NEW_USER: req => {
    const { email, password } = req.body;
    return userAuthQueryFactory(queryName, email, password);
  }
});

const routeRequest = query => async (req, res, next) => {
  const { rows } = await submitQuery(query);
  if (!rows) {
    next();
    res.sendStatus(404);
  }
  res.send(rows[0]);
};

module.exports = {
  submitQuery,
  routeRequest
};
