import { Router } from 'express';
import { authenticate } from '../middleware/middleware';
import { container } from '../../main/container';
import { ShipmentController } from '../controllers/ShipmentController';
import { shipmentValidationRules } from '../validators/shipment.validator';
import { Request, Response, NextFunction } from 'express';
import { validateReq } from '../middleware/validate';


const router = Router();
const ctrl = container.resolve(ShipmentController);

router.post('/', authenticate, shipmentValidationRules, validateReq, (req: Request, res: Response, next: NextFunction) => ctrl.createOne(req, res, next));
router.get('/', authenticate, (req, res, next) => ctrl.listAll(req, res, next));
router.get('/:id', authenticate, (req, res, next) => {
	Promise.resolve(ctrl.getOne(req, res, next)).catch(next);
});

export default router;
