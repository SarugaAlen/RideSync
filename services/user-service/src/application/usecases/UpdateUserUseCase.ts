import { IUserRepository } from '../../domain/repository/IUserRepository';
import User from '../../domain/models/User';

export class UpdateUserUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: number, updateData: { name?: string; email?: string; password?: string }): Promise<User> {
        const existingUser = await this.userRepository.findById(userId);
        if (!existingUser) {
            throw new Error('User not found');
        }

        if (updateData.name) existingUser.name = updateData.name;
        if (updateData.email) existingUser.email = updateData.email;
        if (updateData.password) existingUser.password = updateData.password;

        return await this.userRepository.update(existingUser);
    }
}
