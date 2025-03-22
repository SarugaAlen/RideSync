import { CreateUserUseCase } from '../src/application/usecases/CreateUserUseCase';
import User from '../src/domain/models/User';
import { IUserRepository } from '../src/domain/repository/IUserRepository';
import {UserService} from '../src/application/services/UserService'; 

const mockUserRepository: jest.Mocked<IUserRepository> = {
    findByEmail: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('User Service', () => {
    let createUserUseCase: CreateUserUseCase;

    beforeEach(() => {
        createUserUseCase = new CreateUserUseCase(mockUserRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const userService = new UserService(mockUserRepository);


    it('should create a new user', async () => {
        const userData = { name: 'Jane Doe', email: 'jane@example.com', password: 'password123' };
        mockUserRepository.findByEmail.mockResolvedValueOnce(null); 
        mockUserRepository.create.mockResolvedValueOnce(new User());

        const user = await createUserUseCase.execute(userData);

        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
        expect(mockUserRepository.create).toHaveBeenCalledWith({
            ...userData,
            password: expect.any(String), 
        });
        expect(user).toBeInstanceOf(User);
    });

    it('should throw an error if user already exists', async () => {
        const userData = { name: 'Jane Doe', email: 'jane@example.com', password: 'password123' };
        mockUserRepository.findByEmail.mockResolvedValueOnce(new User()); 

        await expect(createUserUseCase.execute(userData)).rejects.toThrow('User already exists');
    });

    it('should find a user by ID', async () => {
        const userId = 1;
        const user = new User();
        mockUserRepository.findById.mockResolvedValueOnce(user); 

        const foundUser = await userService.findUserById(userId);

        expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
        expect(foundUser).toEqual(user);
    });

    it('should return null if user not found by ID', async () => {
        const userId = 2;
        mockUserRepository.findById.mockResolvedValueOnce(null); 

        const foundUser = await userService.findUserById(userId);

        expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
        expect(foundUser).toBeNull();
    });

    it('should retrieve all users', async () => {
        const users = [new User(), new User()];
        mockUserRepository.findAll.mockResolvedValueOnce(users);

        const allUsers = await userService.findAllUsers();

        expect(mockUserRepository.findAll).toHaveBeenCalled();
        expect(allUsers).toEqual(users);
    });

    it('should update a user', async () => {
        const userId = 1;
        const updatedData = { name: 'Jane Smith', email: 'jane.smith@example.com', password: 'newpassword123' };
        const updatedUser = new User();
        mockUserRepository.update.mockResolvedValueOnce(updatedUser); 

        const user = await userService.updateUser(userId, updatedData);

        expect(mockUserRepository.update).toHaveBeenCalledWith(userId, updatedData);
        expect(user).toEqual(updatedUser);
    });

    it('should delete a user', async () => {
        const userId = 1;
        mockUserRepository.delete.mockResolvedValueOnce(undefined);

        const result = await userService.deleteUser(userId);

        expect(mockUserRepository.delete).toHaveBeenCalledWith(userId);
        expect(result).toBe(true);
    });
});
