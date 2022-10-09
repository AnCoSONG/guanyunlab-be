import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { username, password } = request.body;
    const user = await this.authService.validateUser(username, password);
    request['user'] = user;
    return true;
  }
}
