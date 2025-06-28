import { Pool } from 'pg';
import dotenv from 'dotenv';
import { UserRepository } from '../../application/ports/UserRepository';
import { User } from '../../domain/entities/User';

dotenv.config();
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

export class PgUserRepository implements UserRepository {
  async create(email: string, passwordHash: string): Promise<User> {
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, password, created_at',
      [email, passwordHash]
    );
    const row = result.rows[0];
    return new User(row.id, row.email, row.password, new Date(row.created_at));
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT id, email, password, created_at FROM users WHERE email = $1',
      [email]
    );
    if (result.rowCount === 0) return null;
    const row = result.rows[0];
    return new User(row.id, row.email, row.password, new Date(row.created_at));
  }
}