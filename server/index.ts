import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import pool from './db';
import { register, login } from './auth/auth';
import { authenticate, AuthRequest } from './middleware/middleware';



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

type ErrorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;
const errorHandler: ErrorHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno' });
};


// Health check endpoint
app.get('/health', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'ok', time: result.rows[0].now });
  } catch (error) {
    console.error('Error DB:', error);
    res.status(500).json({ status: 'error', error });
  }
});

app.post('/auth/register', register);
app.post('/auth/login', login);

// User registration endpoint
app.get(
  '/profile',
  authenticate,
  (req: AuthRequest, res) => {
    res.json({ message: 'Acceso concedido', user: req.user });
  }
);

app.use(errorHandler);
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

app.listen(PORT, () => {
  console.log(`server on in  http://localhost:${PORT}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('¡API de Express y TypeScript funcionando!');
});
