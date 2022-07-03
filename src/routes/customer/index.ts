import { Router } from 'express';

import createCustomerController from '../../controllers/customer/createCustomerController';
import deleteCustomerController from '../../controllers/customer/deleteCustomerController';
import getAllCustomersController from '../../controllers/customer/getAllCustomersController';
import loginCustomerController from '../../controllers/customer/loginCustomerController';
import updateCustomerController from '../../controllers/customer/updateCutomerController';

import checkEmail from '../../middlewares/checkEmail';
import validateLogin from '../../middlewares/validateLogin';
import validateSchema from '../../middlewares/validateSchema';
import validateToken from '../../middlewares/validateToken';

import {
  createCustomerSchema,
  loginCustomerSchema,
  updateCustomerSchema,
} from '../../schemas/customer';

const customerRoutes = Router();

customerRoutes.post(
  '',
  validateSchema(createCustomerSchema),
  checkEmail,
  createCustomerController,
);

customerRoutes.post(
  '/login',
  validateSchema(loginCustomerSchema),
  validateLogin,
  loginCustomerController,
);

customerRoutes.get('', getAllCustomersController);

customerRoutes.patch(
  '',
  validateToken,
  validateSchema(updateCustomerSchema),
  updateCustomerController,
);

customerRoutes.delete(
  '',
  validateToken,
  deleteCustomerController,
);

export default customerRoutes;
