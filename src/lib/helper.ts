import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import * as jwt from "jsonwebtoken";

const scryptAsync = promisify(scrypt);
export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(password: string, plaintext: string) {
    const [hashedPassword, salt] = password.split(".");
    const buf = (await scryptAsync(plaintext, salt, 64)) as Buffer;

    return buf.toString("hex") == hashedPassword;
  }
}

export type UserAuthObject = {
  id: string; 
};
export const generateJWT = (
  secret: string,
  payload: UserAuthObject
): string => {
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
};  

export const AlphaNumeric = (length: number, type = 'alpha') => {
  var result = '';
  var characters = type === 'alpha' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' : '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
