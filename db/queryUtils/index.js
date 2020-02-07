const acquirePoolConnection = require("../../db/config/poolConnection");

const executeQuery = async query => {
  console.log("query", query);
  try {
    const client = await acquirePoolConnection();
    client.release();
    return await client.query(query);
  } catch (error) {
    console.log("Error executing query ==> ", error.stack);
    throw error;
  }
};

module.exports = {
  executeQuery
};
