import { Request, Response } from 'express';
import CustomerRepo from '../../repositories/customer';

const deleteCustomerController = async (req: Request, res: Response) => {
  const { id } = req;

  const deleteResult = await new CustomerRepo().deleteCustomer(id);

  if (deleteResult.affected === 0) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  return res.status(204).json();
};

export default deleteCustomerController;
