import { assert } from "chai";
import { encrypt, decrypt } from './crypto';

describe("Crypto component", () => {
    it("Encrypt and decrypt correctly", () => {
        let message = { institution: "i" }
        let privateKey = "key";

        const encryptedMessage = encrypt(message, privateKey);
        const decryptedMessage = decrypt(encryptedMessage, privateKey);

        assert.notStrictEqual(decryptedMessage, message);
    })
})