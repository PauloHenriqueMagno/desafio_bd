import { Request, Response } from 'express';
import request from 'request';

import { ICustomer } from '../../interfaces/customer';
import CustomerRepo from '../../repositories/customer';

const createCustomerController = async (req: Request, res: Response) => {
  const { postal_code } = req.body;

  const postalCode: string = postal_code.replace('-', '');

  const url = `https://viacep.com.br/ws/${postalCode}/json/`;

  request({ url, method: 'GET' }, async (error, response, body) => {
    const address = JSON.parse(body);

    const addressFormatted = {
      address: address.logradouro,
      address_district: address.bairro,
      address_state: address.localidade,
    };

    const newCustomerDataValidated: ICustomer = {
      ...req.validated,
      ...addressFormatted,
    };

    const newCustomer = await new CustomerRepo().createCustomer(
      newCustomerDataValidated,
    );

    const { password, ...newCustomerFormatted } = (
      await new CustomerRepo().saveCustomer(newCustomer)
    );

    res.status(201).json(newCustomerFormatted);
  });

  return res;
};

export default createCustomerController;
