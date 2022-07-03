import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import CustomerRepo from '../repositories/customer';

const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  const customer = await new CustomerRepo().getCustomerByEmail(email);

  if (!customer) {
    return res.status(401).json({ error: 'E-mail or password are incorrect' });
  }

  const match = await bcrypt.compare(password, customer.password);

  if (!match) {
    return res.status(401).json({ error: 'E-mail or password are incorrect' });
  }

  req.customer = customer;

  return next();
};

export default validateLogin;
