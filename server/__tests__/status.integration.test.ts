import request from 'supertest';
import app from '../main/server';
import { pool as pgPool } from '../infrastructure/db/PgShipmentRepository';

describe('HU4 – Shipment Status & History Flow', () => {
  const ts = Date.now();
  const user = { email: `status${ts}@test.com`, password: 'TestPass123!' };
  let token: string;
  let shipmentId: number;

  beforeAll(async () => {
    // 1) Registro & login
    await request(app)
      .post('/auth/register')
      .send(user)
      .expect(201);

    const login = await request(app)
      .post('/auth/login')
      .send(user)
      .expect(200);
    token = login.body.token;

    // 2) Creo un envío base
    const create = await request(app)
      .post('/shipment')
      .set('Authorization', `Bearer ${token}`)
      .send({
        origin: 'Bogota',
        destination: 'Cali',
        weightKg: 2.5,
        lengthCm: 30,
        widthCm: 20,
        heightCm: 10,
        quotedPriceCents: 12000
      })
      .expect(201);
    shipmentId = create.body.id;
  });

  it('rejects status change without token', () => {
    return request(app)
      .put(`/shipment/${shipmentId}/status`)
      .send({ status: 'En tránsito' })
      .expect(401);
  });

  it('changes shipment status and returns the history record', async () => {
    const res = await request(app)
      .put(`/shipment/${shipmentId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'En tránsito' })
      .expect(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        shipmentId,
        status: 'En tránsito'
      })
    );
  });

  it('rejects history fetch without token', () => {
    return request(app)
      .get(`/shipment/${shipmentId}/history`)
      .expect(401);
  });

  it('retrieves the status history for that shipment', async () => {
    const res = await request(app)
      .get(`/shipment/${shipmentId}/history`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ shipmentId, status: 'En tránsito' })
      ])
    );
  });
});

afterAll(async () => {
  await pgPool.end();
});
