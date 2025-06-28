import express, { Request, Response } from 'express';
import pool from './db';



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());




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


app.listen(PORT, () => {
  console.log(`server on in  http://localhost:${PORT}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('¡API de Express y TypeScript funcionando!');
});
