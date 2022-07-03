import { Request, Response } from 'express';

class ErrorHandler extends TypeError {
  statusCode: number;
  message: string;

  constructor(statuscode: number, message: string) {
    super();
    this.statusCode = statuscode;
    this.message = message;
  }
}

const handleErrors = (error: ErrorHandler, _: Request, res: Response) => {
  const { statusCode, message } = error;

  return res.status(statusCode).send(message);
};

export { ErrorHandler, handleErrors };
