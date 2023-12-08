import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@prisma/client';

export const currentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getCurrentUserByCtx(context),
);

function getCurrentUserByCtx(context: ExecutionContext): User {
  return context.switchToHttp().getRequest().user;
}
