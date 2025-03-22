import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export default class AuthService {
    static generateToken(userId: string): string {
        return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
    }

    static verifyToken(token: string): any {
        return jwt.verify(token, JWT_SECRET);
    }
}
