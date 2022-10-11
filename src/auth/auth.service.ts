import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username, password) {
    const user = await this.userService.findByName(username);
    if (user && compareSync(password, user.password)) {
      const { password, ...data } = user;
      return data;
    }
    throw new UnauthorizedException('user validation failed');
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      id: user.id,
      username: user.username,
    };
  }
}
