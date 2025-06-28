
import request from 'supertest';
import { app } from '../main/server';

describe('HU2 – Shipping Quote Flow', () => {
  const timestamp = Date.now();
  const user = {
    email: `user${timestamp}@test.com`,
    password: 'TestPass123!'
  };
  let token: string;

  it('registers a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(user)
      .expect(201);
    expect(res.body.message).toBe('Registered user sucessfull');
  });

  it('logs in and returns a JWT token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send(user)
      .expect(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('rejects quote without token', async () => {
    await request(app)
      .post('/quote')
      .send({
        origin: 'Bogota',
        destination: 'Medellin',
        weightKg: 4,
        lengthCm: 30,
        widthCm: 20,
        heightCm: 10
      })
      .expect(401);
  });

  it('rejects invalid payload', async () => {
    const res = await request(app)
      .post('/quote')
      .set('Authorization', `Bearer ${token}`)
      .send({
        origin: '',
        destination: 'Medellin',
        weightKg: -1,
        lengthCm: 0,
        widthCm: 0,
        heightCm: 0
      })
      .expect(400);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors.length).toBeGreaterThan(0);
  });

  it('returns correct price for valid quote', async () => {
    const res = await request(app)
      .post('/quote')
      .set('Authorization', `Bearer ${token}`)
      .send({
        origin: 'Bogota',
        destination: 'Medellin',
        weightKg: 4,
        lengthCm: 30,
        widthCm: 20,
        heightCm: 10
      })
      .expect(200);
    expect(res.body.priceCents).toBe("12000");
  });
});
