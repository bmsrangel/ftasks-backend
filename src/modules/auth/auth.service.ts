import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/db/entities/UserEntity';
import { EncryptUtil } from '../shared/encrypt.util';
import { TokensService } from '../tokens/tokens.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokensService: TokensService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<UserEntity>> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await EncryptUtil.checkPassword(password, user.password))) {
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
  }

  async login(userData: any): Promise<any> {
    const payload = {
      email: userData.email,
      name: userData.name,
      sub: userData.id,
    };
    const token = this.jwtService.sign(payload);
    this.tokensService.saveToken(token, userData.email);
    return {
      name: userData.name,
      access_token: token,
    };
  }
}
