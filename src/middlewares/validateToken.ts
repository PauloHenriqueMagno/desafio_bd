import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import JWTConfig from '../configs/jwtConfig';
import Customer from '../entities/customer';

import CustomerRepo from '../repositories/customer';

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing header authorization' });
  }

  jwt.verify(token, JWTConfig.secret, async (error: any, decoded: any) => {
    if (error) {
      res.status(401).json({ error: 'Invalid token' });
    }

    req.id = decoded.id;
    req.email = decoded.email;
  });

  if (res.statusCode === 401) {
    return res;
  }

  return next();
};

export default validateToken;
