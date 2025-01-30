import { Response } from 'express';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const sendResponse = (res: Response, statusCode: number, success: boolean, message: string, data?: any): void => {
  res.status(statusCode).json({
    success,
    message,
    data: data || null,
  });
};
