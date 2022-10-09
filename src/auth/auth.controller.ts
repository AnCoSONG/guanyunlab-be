import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from './guard/local.guard';

@ApiTags('鉴权')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() login: LoginDto, @User() user: any) {
    const data = await this.authService.login(user);
    return data;
  }
}
