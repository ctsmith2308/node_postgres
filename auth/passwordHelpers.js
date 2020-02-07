var bcrypt = require("bcryptjs");

const hashPassword = async password => {
  let salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  return await bcrypt.hash(password, salt);
};

module.exports = {
  hashPassword
}