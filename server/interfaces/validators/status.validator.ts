import { body } from "express-validator";

export const statusValidationRules = [
  body('status')
    .isString().withMessage('status must be a string')
    .notEmpty().withMessage('status is required')
    .isIn(['Pendiente', 'En tránsito', 'Entregado', 'Cancelado', 'En espera'])
      .withMessage('status must be one of: pending, in_transit, delivered, cancelled'),
  
  body('comment')
    .optional()
    .isString().withMessage('comment must be a string')
    .trim()
    .isLength({ max: 500 }).withMessage('comment cannot exceed 500 characters'),
];