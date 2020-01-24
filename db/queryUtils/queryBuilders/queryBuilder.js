const userAuthenticationQueryStatements = require("../queryStatements/authQueryStatements");

let authenticationQueryFactory = (queryName, ...args) => {
  let queryList = {
    REGISTER_NEW_USER: {
      text: userAuthenticationQueryStatements[queryName],
      values: [...args, new Date(1944, 10, 13)],
      rowMode: "array"
    }
    //.... and others
  };
  return queryList[queryName];
};

const parseRequestFactory = (queryName, req) => {
  let requestTypes = {
    REGISTER_NEW_USER: req => {
      const { email, password } = req.body;
      return userAuthQueryBuilder(queryName, email, password);
    }
    //.... and others
  };
  return requestTypes[queryName];
};

module.exports = {
  authenticationQueryFactory,
  parseRequestFactory
};
