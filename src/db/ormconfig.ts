import { ConnectionOptions } from 'typeorm';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const typeormConfig = {
  type: 'postgres',
  url: process.env.DB_URL,
  logging: false,
  synchronize: true,
  ssl: { rejectUnauthorized: false },
  entities: [path.join(__dirname, '../entities/**/*.*')],
  migrations: [path.join(__dirname, '../migrations/**/*.*')],
  cli: {
    entitiesDir: path.join(__dirname, '../entities'),
    migrationsDir: path.join(__dirname, '../migrations'),
  },
} as ConnectionOptions;

export default typeormConfig;
