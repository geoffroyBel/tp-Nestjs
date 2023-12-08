import { CanActivate, ExecutionContext } from '@nestjs/common';
import { log } from 'console';
import { Observable } from 'rxjs';
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }

    if (request.user.admin) {
      return true;
    }
  }
}
