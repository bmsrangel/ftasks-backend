import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/UserEntity';
import { Repository } from 'typeorm';
import { EncryptUtil } from '../shared/encrypt.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async addNewUser(userData: UserEntity): Promise<Partial<UserEntity>> {
    const hashedPassword = await EncryptUtil.hashPassword(userData.password);
    userData.password = hashedPassword;
    const { password, ...user } = await this.usersRepository.save(userData);
    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async findUserById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }
}
