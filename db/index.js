require("dotenv").config();
const { Pool } = require("pg");

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

const submitQuery = async query => {
  try {
    const client = await acquirePoolConnection();
    client.release();
    return await client.query(query);
  } catch (error) {
    console.log("Error executing query ==> ", error.stack);
  }
};

const routeRequest = query => async (req, res, next) => {
  const { rows } = await submitQuery(query);
  if (!rows) {
    next(error);
    res.sendStatus(404);
  }
  res.send(rows[0]);
};

module.exports = {
  submitQuery,
  routeRequest
};
