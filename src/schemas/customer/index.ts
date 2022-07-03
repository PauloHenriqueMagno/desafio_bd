import * as yup from 'yup';
import { hashSync } from 'bcrypt';

export const createCustomerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  password: yup
    .string()
    .transform((pwd) => hashSync(pwd, 10))
    .required(),
  phone_number: yup
    .string()
    .matches(
      /\([0-9]{2}\)9[0-9]{4}-[0-9]{4}/,
      'Valid phone number format: (00)90000-0000',
    )
    .required(),
  postal_code: yup
    .string()
    .matches(/[0-9]{5}-[0-9]{3}/, 'Valid postal code: xxxxx-xxx')
    .required(),
  address_number: yup.number().required(),
  address_complement: yup.string().default(''),
});

export const updateCustomerSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email().lowercase(),
  password: yup
    .string()
    .transform((pwd) => hashSync(pwd, 10)),
  phone_number: yup
    .string()
    .matches(
      /\([0-9]{2}\)9[0-9]{4}-[0-9]{4}/,
      'Valid phone number format: (00)90000-0000',
    ),
  postal_code: yup
    .string()
    .matches(/[0-9]{5}-[0-9]{3}/, 'Valid postal code: xxxxx-xxx'),
  address_number: yup.number(),
  address_complement: yup.string(),
});

export const loginCustomerSchema = yup.object().shape({
  email: yup.string().email().lowercase().required(),
  password: yup.string().required(),
});
