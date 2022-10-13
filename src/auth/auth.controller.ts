import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guard/jwt.guard';
import { LocalGuard } from './guard/local.guard';

@ApiTags('鉴权')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger('AuthController')
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() login: LoginDto, @User() user: any) {
    const data = await this.authService.login(user);
    return data;
  }

  @Get('check')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async check(@User() user) {
    // this.logger.log(user)
    return user;
  }
}
