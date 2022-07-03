import { Request, Response } from 'express';
import request from 'request';

import { ICustomer } from '../../interfaces/customer';
import CustomerRepo from '../../repositories/customer';

const updateCustomerController = async (req: Request, res: Response) => {
  const { postal_code } = req.body;
  const { id, email } = req;

  const postalCode: string = postal_code ? postal_code.replace('-', '') : '00000000';

  const url = `https://viacep.com.br/ws/${postalCode}/json/`;

  request({ url, method: 'GET' }, async (error, response, body) => {
    const address = JSON.parse(body);

    const addressFormatted = req.validated.postal_code ? {
      address: address.logradouro,
      address_district: address.bairro,
      address_state: address.localidade,
    } : {};

    const newCustomerDataValidated: ICustomer = {
      ...req.validated,
      ...addressFormatted,
    };

    const updatedCustomer = await new CustomerRepo().updateCustomer(
      id,
      newCustomerDataValidated,
    );

    if (updatedCustomer.affected === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const { password, ...customer } = await new CustomerRepo().getCustomerByEmail(email);

    return res.status(200).json(customer);
  });

  return res;
};

export default updateCustomerController;
