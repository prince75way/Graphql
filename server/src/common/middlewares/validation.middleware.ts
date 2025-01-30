import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { sendResponse } from '../../utils/response.helper';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendResponse(res, 400, false, 'Validation failed', {
      errors: errors.array().map((error: any) => ({
        field: error.param || error.path,  // Handle both cases for safety
        message: error.msg,
      })),
    });
  } else {
    next();
  }
};
