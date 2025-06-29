import 'reflect-metadata';
import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import quoteRoutes from '../interfaces/routes/quote.route';
import authRoutes from '../interfaces/routes/auth.route';
import shipmentRoutes from '../interfaces/routes/shipment.route';
import statusRoutes from '../interfaces/routes/status.route';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import { Server as IOServer } from 'socket.io';
import { createAdapter }      from '@socket.io/redis-adapter';
import { createClient }       from 'redis';
import { container } from 'tsyringe';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// HTTP server and Socket.io setup
const httpServer = http.createServer(app);
const io = new IOServer(httpServer, {
  cors: { origin: '*' }
});


// Initialize Redis Pub/Sub in an async bootstrap function
async function initPubSub() {
  const pubClient = createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` });
  const subClient = pubClient.duplicate();
  await pubClient.connect();
  await subClient.connect();

  io.adapter(createAdapter(pubClient, subClient));
  io.on('connection', socket => {
    const { shipmentId } = socket.handshake.query;
    socket.join(`shipmentStatus:${shipmentId}`);
  });

  await subClient.pSubscribe('shipmentStatus:*', (message, channel) => {
    io.to(channel).emit('statusUpdate', JSON.parse(message));
  });
}

initPubSub().catch(err => {
  console.error('Error initializing Redis Pub/Sub:', err);
});



// Montar rutas
app.use('/quote', quoteRoutes);
app.use('/auth', authRoutes);
app.use('/shipment', shipmentRoutes);
app.use('/shipment', statusRoutes);


// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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