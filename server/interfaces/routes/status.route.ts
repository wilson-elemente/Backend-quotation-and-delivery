// src/interfaces/routes/status.route.ts
import { Router } from 'express';
import { authenticate } from '../middleware/middleware';
import { container } from '../../main/container';
import { statusValidationRules } from '../validators/status.validator';
import { validateReq } from '../middleware/validate';
import { StatusController } from '../controllers/StatusController';
import { Request, Response, NextFunction } from 'express';

const router = Router();
const ctrl = container.resolve(StatusController);

/**
 * @openapi
 * /shipment/{id}/status:
 *   put:
 *     tags:
 *       - Shipment
 *     summary: Change the status of a shipment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the shipment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: New status (e.g. "En tránsito", "Entregado")
 *                 example: "En tránsito"
 *           example:
 *             status: "En tránsito"
 *     responses:
 *       '200':
 *         description: Status updated and history record returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatusHistoryRecord'
 *       '400':
 *         description: Invalid payload
 *       '401':
 *         description: Unauthorized – missing/invalid JWT
 *       '404':
 *         description: Shipment not found
 */
router.put('/:id/status', authenticate, statusValidationRules, validateReq, (req: Request, res: Response, next: NextFunction): void => {
        ctrl.update(req, res, next).catch(next);
    }
);

/**
 * @openapi
 * /shipment/{id}/history:
 *   get:
 *     tags:
 *       - Shipment
 *     summary: Retrieve the status history of a shipment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the shipment whose history to fetch
 *     responses:
 *       '200':
 *         description: Array of status history records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StatusHistoryRecord'
 *       '401':
 *         description: Unauthorized – missing/invalid JWT
 *       '404':
 *         description: Shipment not found
 */
router.get('/:id/history', authenticate, (req, res, next) => ctrl.history(req, res, next)
);

export default router;
