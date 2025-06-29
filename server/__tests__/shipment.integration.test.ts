// server/__tests__/shipment.integration.test.ts

import request from 'supertest';
import app from '../main/server';
import { pool as pgPool } from '../infrastructure/db/PgShipmentRepository';

describe('HU3 – Shipments Flow', () => {
  const ts = Date.now();
  const user = {
    email: `shipper${ts}@test.com`,
    password: 'TestPass123!'
  };
  let token: string;
  let createdId: number;

  // 1. Registra y loguea un usuario para obtener JWT
  it('registers & logs in a user', async () => {
    await request(app)
      .post('/auth/register')
      .send(user)
      .expect(201);

    const res = await request(app)
      .post('/auth/login')
      .send(user)
      .expect(200);

    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  // 2. Crea un envío
  it('creates a new shipment', async () => {
    const payload = {
      origin: 'Bogota',
      destination: 'Medellin',
      weightKg: 3.5,
      lengthCm: 40,
      widthCm: 30,
      heightCm: 20,
      quotedPriceCents: 18000
    };

    const res = await request(app)
      .post('/shipment')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
      .expect(201);

    // guarda el ID para los siguientes tests
    createdId = res.body.id;
    expect(res.body).toMatchObject({
      origin: payload.origin,
      destination: payload.destination,
      weightKg: payload.weightKg,
      lengthCm: payload.lengthCm,
      widthCm: payload.widthCm,
      heightCm: payload.heightCm,
      quotedPriceCents: payload.quotedPriceCents,
      status: 'En espera'
    });
    expect(typeof res.body.id).toBe('number');
  });

  // 3. Lista todos los envíos del usuario
  it('lists shipments for that user', async () => {
    const res = await request(app)
      .get('/shipment')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    const found = res.body.find((s: any) => s.id === createdId);
    expect(found).toBeDefined();
    expect(found.origin).toBe('Bogota');
  });

  // 4. Obtiene un envío por ID
  it('retrieves a shipment by id', async () => {
    const res = await request(app)
      .get(`/shipment/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.id).toBe(createdId);
    expect(res.body.origin).toBe('Bogota');
  });

  // 5. 404 si pides un id ajeno / inexistente
  it('returns 404 for non-existent shipment', async () => {
    await request(app)
      .get('/shipment/999999')
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });
});

// Cierra la conexión a Postgres al final
afterAll(async () => {
  await pgPool.end();
});
