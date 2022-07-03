import { getRepository, Repository } from 'typeorm';
import Customer from '../../entities/customer';
import { ICustomer, ICustomerRepo } from '../../interfaces/customer';

class CustomerRepo implements ICustomerRepo {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  createCustomer = async (customerData: ICustomer) => this.ormRepository.create(customerData);

  saveCustomer = async (CustomerData: ICustomer) => (
    await this.ormRepository.save(CustomerData)
  );

  updateCustomer = (id: string, newCustomerData: ICustomer) => (
    this.ormRepository.update(id, newCustomerData)
  );

  deleteCustomer = (id: string) => (
    this.ormRepository.delete({ id })
  );

  getAllCustomers = () => this.ormRepository.find();

  getCustomerByEmail = (email: string) => this.ormRepository.findOne({ email });
}

export default CustomerRepo;
