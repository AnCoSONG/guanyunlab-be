import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//todo: enhancement
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
