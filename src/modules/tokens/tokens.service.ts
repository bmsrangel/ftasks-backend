import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from 'src/db/entities/TokenEntity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokensRepository: Repository<TokenEntity>,
    private usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async saveToken(token: string, email: string): Promise<void> {
    const tokenEntity = await this.tokensRepository.findOne({
      where: {
        email,
      },
    });
    if (tokenEntity) {
      this.tokensRepository.update(tokenEntity.id, {
        token,
      });
    } else {
      this.tokensRepository.insert({
        token,
        email,
      });
    }
  }

  async refreshToken(oldToken: string): Promise<any> {
    const tokenEntity = await this.tokensRepository.findOne({
      where: {
        token: oldToken,
      },
    });
    if (tokenEntity) {
      const user = await this.usersService.findUserByEmail(tokenEntity.email);
      return this.authService.login(user);
    } else {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
