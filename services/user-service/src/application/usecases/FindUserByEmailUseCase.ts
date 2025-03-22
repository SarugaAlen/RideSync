import { IUserRepository } from '../../domain/repository/IUserRepository';
import User from '../../domain/models/User';

export class FindUserByEmailUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }
}