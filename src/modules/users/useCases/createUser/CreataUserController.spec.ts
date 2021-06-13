import request from 'supertest'

import { app } from "../../../../app";

describe('Create a user controller', () => {
  it('should be able a create a new user', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'User name',
        email: 'user@test.com',
        password: '12345'
      })

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new user with email exists', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'User name',
        email: 'user@test.com',
        password: '12345'
      })

      const response = await request(app)
      .post('/api/v1/users')
      .send({
        name: 'User name',
        email: 'user@test.com',
        password: '12345'
      })

    expect(response.status).toBe(500);
  });
})
