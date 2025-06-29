import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import quoteRoutes from '../interfaces/routes/quote.route';
import authRoutes from '../interfaces/routes/auth.route';
import shipmentRoutes from '../interfaces/routes/shipment.route';
import { container } from 'tsyringe';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Montar rutas
app.use('/quote', quoteRoutes);
app.use('/auth', authRoutes);
app.use('/shipment', shipmentRoutes);

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
  });
}


export default app;