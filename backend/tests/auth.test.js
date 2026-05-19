const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('Auth API', () => {
  afterAll(() => mongoose.connection.close());

  it('should register a user and return 201', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        phone: '0712345678',
        password: 'Password1',
        role: 'freelancer'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('email', 'testuser@example.com');
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('should return 401 for wrong password on login', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User2',
        email: 'testuser2@example.com',
        phone: '0712345679',
        password: 'Password1',
        role: 'freelancer'
      });
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser2@example.com',
        password: 'WrongPassword'
      });
    expect(res.statusCode).toBe(401);
  });
});
