import { Router } from 'express';
import { authenticate } from '../middleware/middleware';
import { container } from '../../main/container';
import { ShipmentController } from '../controllers/ShipmentController';
import { shipmentValidationRules } from '../validators/shipment.validator';
import { Request, Response, NextFunction } from 'express';
import { validateReq } from '../middleware/validate';


const router = Router();
const ctrl = container.resolve(ShipmentController);

/**
 * @openapi
 * /shipment:
 *   post:
 *     tags:
 *       - Shipment
 *     summary: Create a new shipment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterShipmentDTO'
 *           example:
 *             origin: "Bogota"
 *             destination: "Medellin"
 *             weightKg: 3.5
 *             lengthCm: 40
 *             widthCm: 30
 *             heightCm: 20
 *             quotedPriceCents: 15000
 *     responses:
 *       '201':
 *         description: Shipment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShipmentResponseDTO'
 *       '400':
 *         description: Invalid request payload
 *       '401':
 *         description: Unauthorized – missing or invalid JWT
 */
router.post('/', authenticate, shipmentValidationRules, validateReq, (req: Request, res: Response, next: NextFunction) => ctrl.createOne(req, res, next));

/**
 * @openapi
 * /shipment:
 *   get:
 *     tags:
 *       - Shipment
 *     summary: List all shipments for authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of shipments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShipmentResponseDTO'
 *       '401':
 *         description: Unauthorized – missing or invalid JWT
 */
router.get('/', authenticate, (req, res, next) => ctrl.listAll(req, res, next));


/**
 * @openapi
 * /shipment/{id}:
 *   get:
 *     tags:
 *       - Shipment
 *     summary: Retrieve a specific shipment by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the shipment to retrieve
 *     responses:
 *       '200':
 *         description: Shipment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShipmentResponseDTO'
 *       '401':
 *         description: Unauthorized – missing or invalid JWT
 *       '404':
 *         description: Shipment not found
 */
router.get('/:id', authenticate, (req, res, next) => {
	Promise.resolve(ctrl.getOne(req, res, next)).catch(next);
});

export default router;
