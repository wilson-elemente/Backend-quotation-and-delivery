import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { container } from '../../main/container';

const router = Router();
const authController = container.resolve<AuthController>(AuthController);

router.post('/register', (req, res, next) =>
  authController.register(req, res, next)
);
router.post('/login', (req, res, next) =>
  authController.login(req, res, next)
);

export default router;