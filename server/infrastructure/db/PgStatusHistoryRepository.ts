import { Pool } from 'pg';
import { StatusHistoryRepository } from '../../domain/repositories/StatusHistoryRepository';
import { ShipmentStatusHistory } from '../../domain/entities/ShipmentStatusHistory';
import dotenv from 'dotenv';
import { injectable } from 'tsyringe';

dotenv.config();
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});

@injectable()
export class PgStatusHistoryRepository implements StatusHistoryRepository {
    async record(shipmentId: number, status: string): Promise<ShipmentStatusHistory> {
        const { rows } = await pool.query(
            `INSERT INTO shipment_status_history (shipment_id, status)
        VALUES ($1, $2)
        RETURNING id, shipment_id, status, changed_at`,
            [shipmentId, status]
        );
        const r = rows[0];
        return new ShipmentStatusHistory(
            r.id, r.shipment_id, r.status, new Date(r.changed_at)
        );
    }

    async findByShipment(shipmentId: number): Promise<ShipmentStatusHistory[]> {
        const { rows } = await pool.query(
            `SELECT id, shipment_id, status, changed_at
        FROM shipment_status_history
        WHERE shipment_id = $1
        ORDER BY changed_at ASC`,
            [shipmentId]
        );
        return rows.map(r =>
            new ShipmentStatusHistory(r.id, r.shipment_id, r.status, new Date(r.changed_at))
        );
    }
}
