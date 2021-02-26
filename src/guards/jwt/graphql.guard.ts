import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GraphQLJwtGuard extends AuthGuard('jwt') {
  getRequest(context_: ExecutionContext): Request {
    const context: { req: Request } = GqlExecutionContext.create(context_).getContext();

    return context.req;
  }
}
