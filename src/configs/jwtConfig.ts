import dotenv from 'dotenv';

dotenv.config();

const JWTConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES,
};

export default JWTConfig;
