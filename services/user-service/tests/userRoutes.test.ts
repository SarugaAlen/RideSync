import request from 'supertest';
import express from 'express';
import userRouter from '../src/presentation/routes/userRoutes';

const app = express();
app.use(express.json());
app.use('/users', userRouter);

describe('User API Endpoints', () => {
  let createdUserId: number;

  it('should register a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securepassword',
    };

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
    const response = await request(app)
      .get('/users')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get user by ID', async () => {
    const response = await request(app)
      .get(`/users/${createdUserId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdUserId);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  it('should get user by email', async () => {
    const response = await request(app)
      .get('/users/email/john.doe@example.com')
      .expect(200);

    expect(response.body).toHaveProperty('id', createdUserId);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  it('should update a user', async () => {
    const updatedUserData = {
      name: 'John Updated',
      email: 'john.updated@example.com',
      password: 'newpassword',
    };

    const response = await request(app)
      .put(`/users/${createdUserId}`)
      .send(updatedUserData)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdUserId);
    expect(response.body.name).toBe(updatedUserData.name);
    expect(response.body.email).toBe(updatedUserData.email);
  });

  it('should delete a user', async () => {
    await request(app)
      .delete(`/users/${createdUserId}`)
      .expect(204);
  });

  it('should return 404 for deleted user', async () => {
    await request(app)
      .get(`/users/${createdUserId}`)
      .expect(404);
  });
});
