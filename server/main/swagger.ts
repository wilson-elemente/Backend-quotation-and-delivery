import swaggerJSDoc from 'swagger-jsdoc';
import { version, name } from '../../package.json';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: name,
      version,
      description: 'API for Coordinadora backend — users, quotes, shipments',
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3000}` }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        StatusHistoryRecord: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            shipmentId: {
              type: 'integer',
              example: 42
            },
            status: {
              type: 'string',
              example: 'En tránsito'
            },
            changedAt: {
              type: 'string',
              format: 'date-time',
              example: '2025-06-29T12:34:56.789Z'
            },
          },
        },
        RegisterShipmentDTO: {
          type: 'object',
          required: [
            'origin', 'destination',
            'weightKg', 'lengthCm',
            'widthCm', 'heightCm',
            'quotedPriceCents'
          ],
          properties: {
            origin: { type: 'string', example: 'Bogota' },
            destination: { type: 'string', example: 'Medellin' },
            weightKg: { type: 'number', format: 'float', example: 3.5 },
            lengthCm: { type: 'number', example: 40 },
            widthCm: { type: 'number', example: 30 },
            heightCm: { type: 'number', example: 20 },
            quotedPriceCents: { type: 'integer', example: 15000 }
          }
        },
        ShipmentResponseDTO: {
          type: 'object',
          properties: {
            id: { type: 'integer', format: 'int64', example: 1 },
            origin: { type: 'string', example: 'Bogota' },
            destination: { type: 'string', example: 'Medellin' },
            weightKg: { type: 'number', example: 3.5 },
            lengthCm: { type: 'number', example: 40 },
            widthCm: { type: 'number', example: 30 },
            heightCm: { type: 'number', example: 20 },
            chargeableWeight: { type: 'number', example: 4 },
            quotedPriceCents: { type: 'integer', example: 15000 },
            status: { type: 'string', example: 'En espera' },
            createdAt: { type: 'string', format: 'date-time', example: '2025-06-29T07:14:55.501Z' }
          }
        }
      },
      security: [
        { bearerAuth: [] }
      ]
    }
  },
  apis: [
    __dirname + '/../interfaces/routes/*.ts',
    __dirname + '/../interfaces/controllers/*.ts'
  ]
};

export default swaggerJSDoc(options);
