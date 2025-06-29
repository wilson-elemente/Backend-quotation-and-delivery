import { body } from 'express-validator';

export const shipmentValidationRules = [
  body('origin')
    .isString().withMessage('origin must be a string')
    .notEmpty().withMessage('origin is required'),

  body('destination')
    .isString().withMessage('destination must be a string')
    .notEmpty().withMessage('destination is required')
    .custom((dest, { req }) => {
      if (dest === req.body.origin) {
        throw new Error('origin and destination must differ');
      }
      return true;
    }),

  body('weightKg')
    .isFloat({ gt: 0 }).withMessage('weightKg must be a number > 0'),

  body('lengthCm')
    .isFloat({ gt: 0 }).withMessage('lengthCm must be a number > 0'),

  body('widthCm')
    .isFloat({ gt: 0 }).withMessage('widthCm must be a number > 0'),

  body('heightCm')
    .isFloat({ gt: 0 }).withMessage('heightCm must be a number > 0'),

  body('quotedPriceCents')
    .isInt({ gt: 0 }).withMessage('quotedPriceCents must be an integer > 0'),
];
