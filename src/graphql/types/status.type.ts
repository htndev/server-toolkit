import { HttpStatus } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { OptionalField } from '../fields/optional.field';

@ObjectType({ description: 'Server status response' })
export class StatusType {
  @Field(() => Int)
  status!: HttpStatus;

  @OptionalField(() => String)
  message?: string;
}
