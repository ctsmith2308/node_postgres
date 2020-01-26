require("dotenv").config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
});

const acquirePoolConnection = async () => {
  let something = true;
  let anotherThing = false;
  let somethingNew = "another string";
  console.log("lets test!!!");
  try {
    return await pool.connect();
  } catch (error) {
    console.log("Error acquiring client pool ==> ", error.stack);
    throw error;
  }
};

module.exports = acquirePoolConnection;
