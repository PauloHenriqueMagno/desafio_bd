import { Router } from 'express';
import customerRoutes from './customer';

const routes = Router();

routes.use('/customer', customerRoutes);

export default routes;
