import { Router } from 'express';
import { container } from '../../main/container';
import { QuoteController } from '../controllers/QuoteController';
import { authenticate } from '../../middleware/middleware';

const router = Router();
const ctrl = container.resolve<QuoteController>(QuoteController);

router.post('/', authenticate, (req, res, next) => 
  ctrl.quote(req, res, next)
);

export default router;