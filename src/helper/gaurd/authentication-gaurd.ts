import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request?.headers?.authorization?.split(' ')?.[1];
      console.log('token', token);
      if (!token) {
        throw new UnauthorizedException();
      }
      request.user = this.jwtService.verify(token);

      console.log("request.user", request.user);
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
