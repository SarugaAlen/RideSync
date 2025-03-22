import { IUserRepository } from '../../domain/repository/IUserRepository';
import User from '../../domain/models/User';

export class FindAllUsersUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(): Promise<User[]> {
        return await this.userRepository.findAll();
    }
}