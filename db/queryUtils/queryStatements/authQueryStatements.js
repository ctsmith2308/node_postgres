const queryStrings = {
  REGISTER_NEW_USER:
    "INSERT INTO users(username, password, created_on) VALUES($1, $2, $3)",
  LOGIN_USER: "SELECT * FROM users WHERE username=$1"
};

module.exports = queryStrings;
