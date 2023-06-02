import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import { logger } from '@utils/logger';

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    const errorMessage: object | string = error.error || 'Operation failed';
    const success: boolean = error.success || false;

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ success, message, error: errorMessage });
  } catch (error) {
    next(error);
  }
};
