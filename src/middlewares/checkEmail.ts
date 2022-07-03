import { NextFunction, Request, Response } from 'express';
import CustomerRepo from '../repositories/customer';

const checkEmail = async (req: Request, res: Response, next: NextFunction) => {
  const emailInUse = await new CustomerRepo().getCustomerByEmail(
    req.validated.email,
  );

  if (emailInUse) {
    return res.status(409).json({ error: 'E-mail is already taken' });
  }

  return next();
};

export default checkEmail;
