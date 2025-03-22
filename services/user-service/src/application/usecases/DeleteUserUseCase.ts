import { IUserRepository } from '../../domain/repository/IUserRepository';

export class DeleteUserUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: number): Promise<void> {
        const existingUser = await this.userRepository.findById(userId);
        if (!existingUser) {
            throw new Error('User not found');
        }

        await this.userRepository.delete(existingUser.id);
    }
}