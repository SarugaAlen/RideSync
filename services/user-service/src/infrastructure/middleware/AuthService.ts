import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || "userAcessTS";
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || "userRefreshTS";

export default class AuthService {
  static generateAccessToken(payload: {
    userId: string;
    role: string;
    email: string;
  }): string {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
  }

  static generateRefreshToken(payload: {
    userId: string;
    role: string;
    email: string;
  }): string {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  }

  static verifyAccessToken(token: string): any {
    try {
      return jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (error) {
      throw new Error("Invalid or expired access token");
    }
  }

  static verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }
}
