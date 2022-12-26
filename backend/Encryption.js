const crypto = require("crypto");

const ENCRYPTION_KEY = process.env.REACT_APP_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16


const encrypt = (username, password) => {
    try {
      const iv = crypto.randomBytes(IV_LENGTH);
      const key =  crypto.createHash('sha256').update(ENCRYPTION_KEY).digest('base64').substr(0, 32);
      // const keyPassword = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
      const cipherPassword = crypto.createCipheriv('aes-256-cbc', key, iv);

      // const keyUsername = crypto.createHash('sha256').update(username).digest('base64').substr(0, 32);
      const cipherUsername = crypto.createCipheriv('aes-256-cbc', key, iv);
  
     const encryptedUsername = Buffer.concat([cipherUsername.update(username), cipherUsername.final()]);
     const encryptedPassword = Buffer.concat([cipherPassword.update(password), cipherPassword.final()]);

     return {
       username: encryptedUsername.toString("hex"),
       password: encryptedPassword.toString("hex"),
       iv: iv.toString("hex"),
     };
    } catch (error) {
      console.log(error);
    }
  }

  const decrypt = (service) => {
    try {
      
      const iv = Buffer.from(service.iv, "hex");  
      
      const key = crypto.createHash('sha256').update(ENCRYPTION_KEY).digest('base64').substr(0, 32);
      const decipherUsername = crypto.createDecipheriv('aes-256-cbc', key, iv);
      const decipherPassword = crypto.createDecipheriv('aes-256-cbc', key, iv);

      const username = Buffer.from(service.username, "hex");
      const password = Buffer.from(service.password, "hex");
      
      const decryptedUsername = Buffer.concat([decipherUsername.update(username), decipherUsername.final()]);
      const decryptedPassword = Buffer.concat([decipherPassword.update(password), decipherPassword.final()]);

      service.username = decryptedUsername;
      service.password = decryptedPassword;
    } catch (error) {
      console.log(error)
    }
  }

  module.exports = { encrypt, decrypt };