import { createConnection } from 'typeorm';
import app from './app';
import typeormConfig from './db/ormconfig';

const PORT = process.env.PORT ?? 3000;

createConnection(typeormConfig)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on localhost:${PORT}`);
    });
  })
  .catch((err: any) => console.log(err));
