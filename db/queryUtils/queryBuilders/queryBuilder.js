const queryStrings = require("../queryStatements/authQueryStatements");

const buildQueryConfig = (queryType, ...args) => {
  const queryList = {
    REGISTER_NEW_USER: {
      text: queryStrings[queryType],
      values: [...args, new Date(1944, 10, 13)],
      rowMode: "array"
    },
    LOGIN_USER: {
      text: queryStrings[queryType],
      values: [...args],
      rowMode: "array"
    }
  };
  return queryList[queryType];
};

//parseRouteRequest
// const parseRequestFactory = (queryName, req) => {
//   let requestTypes = {
//     REGISTER_NEW_USER: req => {
//       const { email, password } = req.body;
//       return userAuthQueryBuilder(queryName, email, password);
//     },
//     LOGIN_USER: req => {
//       const { email, password } = req.body;
//       return userAuthQueryBuilder(queryName, email, password);
//     }
//     //.... and others
//   };
//   return requestTypes[queryName];
// };

module.exports = {
  buildQueryConfig
  // parseRequestFactory
};
