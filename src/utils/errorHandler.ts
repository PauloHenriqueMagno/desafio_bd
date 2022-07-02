import { Response } from 'express';

class ErrorHandler extends Error {
  statusCode: number;
  json: any;

  constructor(statuscode: number, json: any) {
    super();
    this.statusCode = statuscode;
    this.json = json;
  }
}

const handleErrors = (error: ErrorHandler, res: Response) => {
  const { statusCode, json } = error;

  return res.status(statusCode).json(json);
};

export { ErrorHandler, handleErrors };
