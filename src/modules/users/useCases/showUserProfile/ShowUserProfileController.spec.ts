import request from 'supertest'

import { app } from "../../../../app";

describe('Create show user controller', () => {
  it('should be able a create a new user', async () => {
      const responseToken = await request(app).post('/api/v1/sessions').send({
        email: 'user@test.com',
        password: '12345',
      });

      const { token } = responseToken.body;

      const responseShow = await request(app).get('/api/v1/profile')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(responseShow.status).toBe(200);
  });
})
