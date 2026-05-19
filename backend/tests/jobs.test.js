const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

describe('Jobs API', () => {
  afterAll(() => mongoose.connection.close());

  it('should not allow freelancer to POST a job', async () => {
    // Register and login as freelancer
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Freelancer',
        email: 'freelancer@example.com',
        phone: '0712345680',
        password: 'Password1',
        role: 'freelancer'
      });
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'freelancer@example.com',
        password: 'Password1'
      });
    const token = loginRes.body.accessToken;
    const res = await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Should Fail',
        description: 'Should not be allowed',
        category: 'Test',
        location: 'Nairobi',
        budget: 1000
      });
    expect(res.statusCode).toBe(403);
  });
});
