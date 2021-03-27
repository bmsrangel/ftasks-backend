import { Body, Controller, Put } from '@nestjs/common';
import { RefreshTokenDto } from './models/token.dto';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
  constructor(private tokensService: TokensService) {}

  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.tokensService.refreshToken(data.old_token);
  }
}
