import { Inject, Type, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { JwtPayload, UserJwtPayload } from '../types/jwt-payload.type';
import { buildFieldLabels } from '../utils/build-field-labels.util';

type JwtSecretConfig = { jwtSecret: string };
type UserRepository = Repository<UserJwtPayload>;

export function JwtStrategyFactory(
  serviceScope: string,
  repository: Type<UserRepository>,
  config: Type<JwtSecretConfig>
): Type<Strategy> {
  class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly label = 'user';

    constructor(
      @InjectRepository(repository) private readonly userRepository: UserRepository,
      @Inject(config) private readonly appConfig: JwtSecretConfig
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: appConfig.jwtSecret
      });
    }

    async validate({ username, email, scope }: JwtPayload): Promise<UserJwtPayload> {
      if (scope !== serviceScope) {
        throw new UnauthorizedException();
      }
      const fields = buildFieldLabels(this.label, ['id', 'username', 'email']);
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
