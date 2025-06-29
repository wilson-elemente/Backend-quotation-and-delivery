import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthRequest extends Request  {
  user?: { userId: number; email: string };
} 

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) :void{
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing token' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      email: string;
    };
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
}