import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UserJwtPayload } from '../types/jwt-payload.type';

export const CurrentUser = createParamDecorator(
  (type: 'graphql' | 'rest', context: ExecutionContext): UserJwtPayload => {
    switch (type) {
      case 'graphql':
        return GqlExecutionContext.create(context).getContext().req.user;
      case 'rest':
        return context.switchToHttp().getRequest().req;
      default:
        return context.switchToHttp().getRequest().req;
    }
  }
);
