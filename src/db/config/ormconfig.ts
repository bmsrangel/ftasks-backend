import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join, resolve } from 'path';

const options: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/todo.db',
  migrations: [resolve(__dirname, '..', 'migrations', '*')],
  entities: [resolve(__dirname, '..', 'entities', '*')],
  cli: {
    entitiesDir: join('src', 'db', 'entities'),
    migrationsDir: join('src', 'db', 'migrations'),
  },
};

module.exports = options;
