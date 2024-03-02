import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import catchAsync from "./catchAsync";
import { ObjectId } from "mongodb";
dotenv.config({ path: "../env/config.env" });
export default class JWT {
  // expiredDate = process.env.JWT_EXPIRATION_DATE || '10h'
  //  secret = process.env.JWT_SECRET_KEY || 'somedayiwillbesomeoneyoucannotimagine';
  constructor(
    private secret: string = process.env.JWT_SECRET_KEY ||
      "somedayiwillbesomeoneyoucannotimagine",
    private expireDate: string = process.env.JWT_EXPIRATION_DATE || "10h"
  ) {
    // this.secret = process.env.JWT_SECRET_KEY || 'somedayiwillbesomeoneyoucannotimagine'
    // this.expireDate = process.env.JWT_EXPIRATION_DATE || '10h'
  }
  signToken = (id: ObjectId) => {
    return jwt.sign({ id }, this.secret, {
      expiresIn: this.expireDate,
    });
  };
  verifyToken = async (
    token: string,
    secret: string = process.env.SECRET_KEY || "somedayiwillbesomeonebeyond"
  ) => {
    return jwt.verify(token, secret);
  };
}
