import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { container } from '../../main/container';

const router = Router();
const authController = container.resolve<AuthController>(AuthController);

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: StrongPass123!
 *     responses:
 *       '201':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Registered user sucessfull
 *       '400':
 *         description: Validation error
 *       '409':
 *         description: Email already registered
 */

router.post('/register', (req, res, next) =>
  authController.register(req, res, next)
);


/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Authenticate a user and get a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: StrongPass123!
 *     responses:
 *       '200':
 *         description: JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '400':
 *         description: Missing email or password
 *       '401':
 *         description: Invalid credentials
 */
router.post('/login', (req, res, next) =>
  authController.login(req, res, next)
);

export default router;