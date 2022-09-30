import * as jwt from "jsonwebtoken";
import { CONFIG } from "src/utils/config";
import { UserData } from "../types/user-data.type";

export class JWTGenerator {
  private user: UserData;

  constructor(user: UserData) {
    this.user = user;
  }

  generateToken(): string {
    return jwt.sign(
      {
        sub: this.user._id,
        exp: new Date().setDate(new Date().getDate() + 1),
      },
      CONFIG.PRIVATE_KEY
    );
  }
}
