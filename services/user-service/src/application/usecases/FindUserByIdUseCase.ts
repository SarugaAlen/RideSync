import { IUserRepository } from '../../domain/repository/IUserRepository';
import User from '../../domain/models/User';

export class FindUserByIdUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: number): Promise<User> {
        const existingUser = await this.userRepository.findById(userId);
        if (!existingUser) {
            throw new Error('User not found');
        }

        return await existingUser;
    }
}