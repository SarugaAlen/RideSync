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
        const userData = { name: 'Jane Doe', email: 'jane@example.com', password: 'password123', role: 'user' };
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
        const userData = { name: 'Jane Doe', email: 'jane@example.com', password: 'password123', role: 'user' };
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
    
        await expect(userService.findUserById(userId)).rejects.toThrow('User not found');
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
        const existingUser = new User();
        existingUser.id = userId;
        existingUser.name = 'Old Name';
        existingUser.email = 'old@example.com';
        existingUser.password = 'oldpassword';
        existingUser.role = 'user';
    
        const updatedData = { name: 'Jane Smith', email: 'jane.smith@example.com', password: 'newpassword123', role: 'admin' };
    
        const updatedUser = Object.assign(new User(), existingUser, updatedData);
    
        mockUserRepository.findById.mockResolvedValueOnce(existingUser);
        mockUserRepository.update.mockResolvedValueOnce(updatedUser);
    
        const user = await userService.updateUser(userId, updatedData);
    
        expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
        expect(mockUserRepository.update).toHaveBeenCalledWith(
            expect.objectContaining({
                id: userId,
                name: updatedData.name,
                email: updatedData.email,
                password: updatedData.password
            })
        );
        expect(user).toEqual(expect.objectContaining(updatedData));
    });

    it('should delete a user', async () => {
        const userId = 1;
        const existingUser = new User();
        existingUser.id = userId;
    
        mockUserRepository.findById.mockResolvedValueOnce(existingUser);
        mockUserRepository.delete.mockResolvedValueOnce(undefined);
    
        await expect(userService.deleteUser(userId)).resolves.toBeUndefined();
        
        expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
        expect(mockUserRepository.delete).toHaveBeenCalledWith(userId);
    });
});
