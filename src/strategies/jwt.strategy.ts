import { Type, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Maybe } from '@xbeat/toolkit';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { AppConfig } from '../providers/config/app.config';
import { JwtPayload } from '../types/jwt-payload.type';
import { buildFieldLabels } from '../utils/build-field-labels.util';

type BaseUserFields = { username: string; email: string };
type UserRepository = Repository<BaseUserFields>;

export function JwtStrategy(serviceScope: string, repository: Type<UserRepository>): Type<Strategy> {
  class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly label = 'user';

    constructor(@InjectRepository(repository) private readonly userRepository: UserRepository, appConfig: AppConfig) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: appConfig.jwtSecret
      });
    }

    async validate({ username, email, scope }: JwtPayload): Promise<Maybe<BaseUserFields>> {
      if (scope !== serviceScope) {
        throw new UnauthorizedException();
      }
      const fields = buildFieldLabels(this.label, ['username', 'email']);
      const user = await this.userRepository
        .createQueryBuilder(this.label)
        .select(fields)
        .where(`${this.label}.username = :username`, { username })
        .andWhere(`${this.label}.email = :email`, { email })
        .getOne();

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    }
  }

  return JwtStrategy;
}
