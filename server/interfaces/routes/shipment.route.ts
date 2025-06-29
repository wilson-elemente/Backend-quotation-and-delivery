import { Router } from 'express';
import { authenticate } from '../middleware/middleware';
import { container } from '../../main/container';
import { ShipmentController } from '../controllers/ShipmentController';

const router = Router();
const ctrl = container.resolve(ShipmentController);

router.post('/', authenticate, (req, res, next) => ctrl.createOne(req, res, next));
router.get('/', authenticate, (req, res, next) => ctrl.listAll(req, res, next));
router.get('/:id', authenticate, (req, res, next) => {
	Promise.resolve(ctrl.getOne(req, res, next)).catch(next);
});

export default router;
