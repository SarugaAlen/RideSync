import request from 'supertest';
import express from 'express';
import userRouter, { setRepository } from '../src/presentation/routes/userRoutes'; // Import setRepository
import User from '../src/domain/models/User';
import { IUserRepository } from '../src/domain/repository/IUserRepository';

const app = express();
app.use(express.json());
app.use('/users', userRouter);

const mockUserRepository: jest.Mocked<IUserRepository> = {
    findByEmail: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('User API Endpoints', () => {
    let createdUserId: number;

    beforeAll(() => {
      setRepository(mockUserRepository);
  });

    it('should register a new user', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'securepassword',
        };

        mockUserRepository.findByEmail.mockResolvedValueOnce(null);
        mockUserRepository.create.mockResolvedValueOnce(new User());

        const response = await request(app)
            .post('/users/register')
            .send(userData)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(userData.name);
        expect(response.body.email).toBe(userData.email);
        createdUserId = response.body.id;
    });

    it('should get all users', async () => {
        const users = [new User(), new User()];
        mockUserRepository.findAll.mockResolvedValueOnce(users); 

        const response = await request(app)
            .get('/users')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(users.length);
    });

    it('should get user by ID', async () => {
        const user = new User();
        user.id = createdUserId; 
        mockUserRepository.findById.mockResolvedValueOnce(user); 

        const response = await request(app)
            .get(`/users/${createdUserId}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', createdUserId);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
    });

    it('should return 404 for non-existent user by ID', async () => {
        mockUserRepository.findById.mockResolvedValueOnce(null);

        await request(app)
            .get(`/users/9999`)
            .expect(404);
    });

    it('should update a user', async () => {
        const updatedUserData = {
            name: 'John Updated',
            email: 'john.updated@example.com',
            password: 'newpassword',
        };

        const existingUser = new User();
        existingUser.id = createdUserId;

        mockUserRepository.findById.mockResolvedValueOnce(existingUser);
        mockUserRepository.update.mockResolvedValueOnce(Object.assign(new User(), updatedUserData));

        const response = await request(app)
            .put(`/users/${createdUserId}`)
            .send(updatedUserData)
            .expect(200);

        expect(response.body).toHaveProperty('id', createdUserId);
        expect(response.body.name).toBe(updatedUserData.name);
        expect(response.body.email).toBe(updatedUserData.email);
    });

    it('should delete a user', async () => {
        const existingUser = new User();
        existingUser.id = createdUserId;

        mockUserRepository.findById.mockResolvedValueOnce(existingUser);
        mockUserRepository.delete.mockResolvedValueOnce(undefined); 

        await request(app)
            .delete(`/users/${createdUserId}`)
            .expect(204);
    });

    it('should return 404 for deleted user', async () => {
        mockUserRepository.findById.mockResolvedValueOnce(null); 

        await request(app)
            .get(`/users/${createdUserId}`)
            .expect(404);
    });
});
