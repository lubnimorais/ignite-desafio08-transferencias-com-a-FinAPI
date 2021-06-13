import request from 'supertest';
import { app } from '../../../../app';

describe('Create Statement Controller', () => {

  it('should be able a create a deposit', async () => {
    const responseToken = await request(app).post('/api/v1/sessions').send({
      email: 'user@test.com',
      password: '12345',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/api/v1/statements/deposit')
      .send({
        amount: 100,
        description: 'Deposit',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it('should be able a create debit', async () => {
    const responseToken = await request(app).post('/api/v1/sessions').send({
      email: 'user@test.com',
      password: '12345',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/api/v1/statements/withdraw')
      .send({
        amount: 100,
        description: 'Debit',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it('should not be able a create a debit without money', async () => {
    const responseToken = await request(app).post('/api/v1/sessions').send({
      email: 'user@test.com',
      password: '12345',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/api/v1/statements/withdraw')
      .send({
        amount: 100,
        description: 'Debit',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(500);
  });
});
