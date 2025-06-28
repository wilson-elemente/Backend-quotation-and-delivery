import { Request, Response, NextFunction } from 'express';
import pool from '../db';
import bcrypt from 'bcryptjs';
import jwt, {Secret, SignOptions} from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Registro de usuario
export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    return;
  }
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hash]
    );
    res.status(201).json({ message: 'Registro exitoso' });
    console.log(`Usuario registrado: ${email}`);
  } catch (err: any) {
    if (err.code === '23505') {
      res.status(409).json({ message: 'Email ya registrado' });
      return;
    }
    next(err);
  }
}

// Login y generación de JWT
export async function login(req: Request, res: Response, next: NextFunction) : Promise<void> {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }
  try {
    const result = await pool.query('SELECT id, password FROM users WHERE email = $1', [email]);
    if (result.rowCount === 0) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const secret: Secret = process.env.JWT_SECRET!;
    const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']
  };

    const token = jwt.sign(
    { userId: user.id, email },  // payload
    secret,                       // secretOrPrivateKey
    options                       // SignOptions
  );
    res.json({ token });
  } catch (err) {
    next(err);
  }
}