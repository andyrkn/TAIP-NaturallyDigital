var CryptoJS = require("crypto-js");

export const encrypt = (message, key) => {
    return CryptoJS.AES.encrypt(JSON.stringify(message), key).toString();
}

export const decrypt = (ciphertext, key) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}