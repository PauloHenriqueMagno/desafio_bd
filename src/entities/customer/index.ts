/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @Column()
  postal_code: string;

  @Column()
  address: string;

  @Column()
  address_number: number;

  @Column()
  address_complement: string;

  @Column()
  address_district: string;

  @Column()
  address_state: string;
}

export default Customer;
