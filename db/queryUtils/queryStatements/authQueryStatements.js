const userAuthenticationQueryStatements = {
  REGISTER_NEW_USER:
    "INSERT INTO users(username, password, created_on) VALUES($1, $2, $3)",
  AUTHENTICATE_USER:
    "INSERT INTO users(username, password, created_on) VALUES($1, $2, $3)",
  AUTHORIZE_USER:
    "INSERT INTO users(username, password, created_on) VALUES($1, $2, $3)"
};

module.exports = userAuthenticationQueryStatements;
