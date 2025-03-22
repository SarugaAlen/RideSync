import { IUserRepository } from '../../domain/repository/IUserRepository';
import bcrypt from 'bcryptjs';
import User from '../../domain/models/User';
import AuthService from '../../infrastructure/auth/AuthService';

export class LoginUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token = AuthService.generateToken(user.id.toString());

        return { user, token };
    }
}
