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

router.put('/:id/status', authenticate, statusValidationRules, validateReq, (req: Request, res: Response, next: NextFunction): void => {
        ctrl.update(req, res, next).catch(next);
    }
);

router.get('/:id/history', authenticate, (req, res, next) => ctrl.history(req, res, next)
);

export default router;
