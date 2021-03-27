import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { TodosModule } from './modules/todos/todos.module';

import * as options from './db/config/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(options), UsersModule, AuthModule, TokensModule, TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
