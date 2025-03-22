import { IUserRepository } from '../../domain/repository/IUserRepository';
import { CreateUserUseCase } from '../usecases/CreateUserUseCase';
import { UpdateUserUseCase } from '../usecases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../usecases/DeleteUserUseCase';
import { FindUserByIdUseCase } from '../usecases/FindUserByIdUseCase';
import { FindAllUsersUseCase } from '../usecases/FindAllUsersUseCase';
import { FindUserByEmailUseCase } from '../usecases/FindUserByEmailUseCase';


export class UserService {
    private createUserUseCase: CreateUserUseCase;
    private updateUserUseCase: UpdateUserUseCase;
    private deleteUserUseCase: DeleteUserUseCase;
    private findUserByIdUseCase: FindUserByIdUseCase;
    private findAllUsersUseCase: FindAllUsersUseCase;
    private findUserByEmailUseCase: FindUserByEmailUseCase;


    constructor(userRepository: IUserRepository) {
        this.createUserUseCase = new CreateUserUseCase(userRepository);
        this.updateUserUseCase = new UpdateUserUseCase(userRepository);
        this.deleteUserUseCase = new DeleteUserUseCase(userRepository);
        this.findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
        this.findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
        this.findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);
    }

    async registerUser(data: { name: string; email: string; password: string }) {
        return this.createUserUseCase.execute(data);
    }

    async updateUser(userId: number, updateData: { name?: string; email?: string; password?: string }) {
        return this.updateUserUseCase.execute(userId, updateData);
    }

    async deleteUser(userId: number) {
        return this.deleteUserUseCase.execute(userId);
    }

    async findUserById(userId: number) {
        return this.findUserByIdUseCase.execute(userId);
    }

    async findAllUsers() {
        return this.findAllUsersUseCase.execute();
    }

    async findUserByEmail(email: string) {
        return this.findUserByEmailUseCase.execute(email);
    }
}
