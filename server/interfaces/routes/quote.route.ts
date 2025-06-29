import { Router } from 'express';
import { body } from 'express-validator';
import { validateReq } from '../middleware/validate';
import { Request, Response, NextFunction } from 'express';
import { container } from '../../main/container';
import { QuoteController } from '../controllers/QuoteController';
import { authenticate } from '../middleware/middleware';
import { quoteValidationRules } from '../validators/quote.validator';

const router = Router();
const ctrl = container.resolve<QuoteController>(QuoteController);

/**
 * @openapi
 * /quote:
 *   post:
 *     tags:
 *       - Quote
 *     summary: Calculate a shipping quote
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - origin
 *               - destination
 *               - weightKg
 *               - lengthCm
 *               - widthCm
 *               - heightCm
 *             properties:
 *               origin:
 *                 type: string
 *                 example: Bogota
 *               destination:
 *                 type: string
 *                 example: Medellin
 *               weightKg:
 *                 type: number
 *                 example: 4.5
 *               lengthCm:
 *                 type: number
 *                 example: 30
 *               widthCm:
 *                 type: number
 *                 example: 20
 *               heightCm:
 *                 type: number
 *                 example: 10
 *     responses:
 *       '200':
 *         description: Quote calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 priceCents:
 *                   type: number
 *                   example: 12000
 *       '400':
 *         description: Invalid request payload
 *       '401':
 *         description: Unauthorized – missing or invalid JWT
 */

router.post(
  '/',
  authenticate,
  quoteValidationRules,
  validateReq,
  (req: Request, res: Response, next: NextFunction) => ctrl.quote(req, res, next)
);

export default router;