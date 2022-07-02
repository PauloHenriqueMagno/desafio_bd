/* eslint-disable no-unused-vars */
import { DeleteResult, UpdateResult } from 'typeorm';
import Customer from '../../entities/customer';

interface ICustomer {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  postal_code: string;
  address: string;
  address_district: string;
  address_number: number;
  address_complement: string;
  address_state: string;
}

interface ICustomerRepo {
  createCustomer: (customerData: ICustomer) => Promise<Customer>;
  saveCustomer: (customerData: ICustomer) => Promise<ICustomer>;
  updateCustomer: (id: string, newCustomerData: ICustomer) => Promise<UpdateResult>;
  deleteCustomer: (id: string) => Promise<DeleteResult>;
  getAllCustomers: () => Promise<Customer[]>;
  getCustomerByEmail: (email: string) => Promise<Customer>;
}

export { ICustomer, ICustomerRepo };
