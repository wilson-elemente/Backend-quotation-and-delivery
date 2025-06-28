import { TariffRepository } from '../../application/ports/TariffRepository';
import { Tariff } from '../../domain/entities/Tariff';
import { Pool } from 'pg';
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
export class PgTariffRepository implements TariffRepository {
    async findByRouteAndWeight(
        origin: string,
        destination: string,
        weightKg: number
    ): Promise<Tariff | null> {
        const result = await pool.query(
            `SELECT id, origin, destination, weight_min_kg, weight_max_kg, price_cents
        FROM tariffs
        WHERE origin = $1
            AND destination = $2
            AND weight_min_kg <= $3
            AND weight_max_kg > $3
        LIMIT 1`,
            [origin, destination, weightKg]
        );
        if (result.rowCount === 0) return null;
        const row = result.rows[0];
        return new Tariff(
            row.id,
            row.origin,
            row.destination,
            row.weight_min_kg,
            row.weight_max_kg,
            row.price_cents
        );
    }
}