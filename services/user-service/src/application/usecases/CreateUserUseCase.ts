import { IUserRepository } from '../../domain/repository/IUserRepository';
import User from '../../domain/models/User';
import bcrypt from 'bcryptjs';

export class CreateUserUseCase {
    private userRepository: IUserRepository;
    private saltRounds: number;

    constructor(userRepository: IUserRepository, saltRounds: number = 10) {
        this.userRepository = userRepository;
        this.saltRounds = saltRounds;
    }

    async execute(data: { name: string; email: string; password: string; role: string; }): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);
        
        const userData = {
            ...data,
            password: hashedPassword,
        };

        return await this.userRepository.create(userData);
    }
}
