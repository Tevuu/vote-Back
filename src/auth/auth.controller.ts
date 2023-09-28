import { Controller, Post, Body, Header } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDTO } from 'src/users/dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Header('Access-Control-Allow-Origin', '*')
  @Post('')
  private async login(@Body() data: AuthUserDTO) {
    return this.authService.login(data);
  }

  @Header('Access-Control-Allow-Origin', '*')
  @Post('/decode')
  private async tokenCheck(@Body() token) {
    return this.authService.tokenCheck(token.token);
  }
}
