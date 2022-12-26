const crypto = require("crypto");

const ENCRYPTION_KEY = process.env.REACT_APP_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16


const encrypt = (username, password) => {
    try {
      const iv = crypto.randomBytes(IV_LENGTH);
      const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  
     const encryptedUsername = Buffer.concat([cipher.update(username), cipher.final()]);
     const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()]);

     return {
        username: encryptedUsername.toString("hex"),
        password: encryptedPassword.toString("hex"),
        iv: iv.toString("hex"),
      };
    } catch (error) {
      console.log(error);
    }
  }
  module.exports = { encrypt };