import { Request, Response } from 'express';
import CustomerRepo from '../../repositories/customer';

const getAllCustomersController = async (req: Request, res: Response) => {
  const customers = await new CustomerRepo().getAllCustomers();

  const newCustomers = customers.map((customer) => {
    const { password, ...newCustomer } = customer;

    return newCustomer;
  });

  return res.status(200).json(newCustomers);
};

export default getAllCustomersController;
