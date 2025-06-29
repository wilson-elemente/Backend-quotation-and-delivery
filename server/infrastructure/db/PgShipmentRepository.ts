import { Pool } from 'pg';
import { ShipmentRepository } from '../../domain/repositories/ShipmentRepository';
import { Shipment } from '../../domain/entities/Shipment';
import { RegisterShipmentDTO } from '../../application/dtos/RegisterShipmentDTO';
import dotenv from 'dotenv';
import { injectable } from 'tsyringe';

dotenv.config();
export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});

@injectable()
export class PgShipmentRepository implements ShipmentRepository {
    async create(userId: number, dto: RegisterShipmentDTO): Promise<Shipment> {
        const volumetric = (dto.lengthCm * dto.widthCm * dto.heightCm) / 2500;
        const chargeable = Math.ceil(Math.max(dto.weightKg, volumetric));
        const result = await pool.query(
            `INSERT INTO shipments
            (user_id, origin, destination, weight_kg, length_cm, width_cm, height_cm, chargeable_weight, quoted_price_cents)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id, user_id, origin, destination, weight_kg, length_cm, width_cm, height_cm,
                    volumetric_weight, chargeable_weight, quoted_price_cents, status, created_at`,
            [
                userId,
                dto.origin,
                dto.destination,
                dto.weightKg,
                dto.lengthCm,
                dto.widthCm,
                dto.heightCm,
                chargeable,
                dto.quotedPriceCents,
            ]
        );
        const r = result.rows[0];
        return new Shipment(
            r.id,
            r.user_id,
            r.origin,
            r.destination,
            parseFloat(r.weight_kg),
            parseFloat(r.length_cm),
            parseFloat(r.width_cm),
            parseFloat(r.height_cm),
            parseFloat(r.volumetric_weight),
            parseFloat(r.chargeable_weight),
            parseInt(r.quoted_price_cents, 10),
            r.status,
            new Date(r.created_at)
        );
    }

    async findByUser(userId: number): Promise<Shipment[]> {
        const res = await pool.query(
            `SELECT id, user_id, origin, destination, weight_kg, length_cm, width_cm, height_cm, volumetric_weight, chargeable_weight, quoted_price_cents, status, created_at
        FROM shipments
        WHERE user_id = $1
        ORDER BY created_at DESC`,
            [userId]
        );
        return res.rows.map(r => new Shipment(
            r.id,
            r.user_id,
            r.origin,
            r.destination,
            parseFloat(r.weight_kg),
            parseFloat(r.length_cm),
            parseFloat(r.width_cm),
            parseFloat(r.height_cm),
            parseFloat(r.volumetric_weight),
            parseFloat(r.chargeable_weight),
            parseInt(r.quoted_price_cents, 10),
            r.status,
            new Date(r.created_at)
        ));
    }

    async findById(id: number): Promise<Shipment | null> {
        const res = await pool.query(
            `SELECT id, user_id, origin, destination, weight_kg, length_cm, width_cm, height_cm, volumetric_weight, chargeable_weight, quoted_price_cents, status, created_at
        FROM shipments
        WHERE id = $1`,
            [id]
        );
        if (res.rowCount === 0) return null;
        const r = res.rows[0];
        return new Shipment(
            r.id,
            r.user_id,
            r.origin,
            r.destination,
            parseFloat(r.weight_kg),
            parseFloat(r.length_cm),
            parseFloat(r.width_cm),
            parseFloat(r.height_cm),
            parseFloat(r.volumetric_weight),
            parseFloat(r.chargeable_weight),
            parseInt(r.quoted_price_cents, 10),
            r.status,
            new Date(r.created_at)
        );
    }

    async updateStatus(shipmentId: number, status: string): Promise<void> {
    await pool.query(
      `UPDATE shipments
         SET status = $1
       WHERE id = $2`,
      [status, shipmentId]
    );
  }
}
