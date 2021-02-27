import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'API response, that something exists or not.' })
export class ExistsType {
  @Field(() => Boolean)
  exists!: boolean;
}
