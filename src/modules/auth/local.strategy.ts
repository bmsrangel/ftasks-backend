import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/db/entities/UserEntity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  // da pra trocar "username" por "email", mas ele sempre espera receber no body o "username";
  // portanto, o ajuste no fim das contas deve ser feito no super!!!
  async validate(
    username: string,
    password: string,
  ): Promise<Partial<UserEntity>> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnprocessableEntityException();
    } else {
      return user;
    }
  }
}
