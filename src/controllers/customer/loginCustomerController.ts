import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import JWTConfig from '../../configs/jwtConfig';

const loginCustomerController = async (
  req: Request,
  res: Response,
) => {
  const { customer } = req;

  const token = jwt.sign({ email: customer.email, id: customer.id }, JWTConfig.secret, {
    expiresIn: JWTConfig.expiresIn,
  });

  return res.status(200).json({ token });
};

export default loginCustomerController;
