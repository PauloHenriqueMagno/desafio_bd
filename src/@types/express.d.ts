/* eslint-disable no-unused-vars */

declare global {
  namespace Express {
    interface Request {
      validated: any;
      email: string;
      id: string;
    }
  }
}

export {};
