import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/login')
  async login(@Body() LoginDto: LoginDto) {
    try {
      const res = await this.authService.login(LoginDto);
      return res;
    } catch (e) {
      throw e;
    }
  }

  @Post('/registration')
  async registration(@Body() RegistrationDto: RegistrationDto) {
    try {
      const res = await this.authService.registration(RegistrationDto);
      return res;
    } catch (e) {
      throw e;
    }
  }

  @Delete('/logout/:uid')
  async logout(@Param() { uid }) {
    try {
      const res = await this.authService.logout(uid);
      return res;
    } catch (e) {
      throw e;
    }
  }
}
