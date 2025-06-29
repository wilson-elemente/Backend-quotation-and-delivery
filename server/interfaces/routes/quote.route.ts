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

router.post(
  '/',
  authenticate,
  quoteValidationRules,
  validateReq,
  (req: Request, res: Response, next: NextFunction) => ctrl.quote(req, res, next)
);

export default router;