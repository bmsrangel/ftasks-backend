import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from 'src/db/entities/UserEntity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() userData: UserEntity): Promise<Partial<UserEntity>> {
    const newUser = await this.usersService.addNewUser(userData);
    return newUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserData(@Request() req) {
    const user = await this.usersService.findUserById(req.user.userId);
    return user;
  }
}
