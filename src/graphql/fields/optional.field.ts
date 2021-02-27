import { Field, FieldOptions, ReturnTypeFunc } from '@nestjs/graphql';

type Options = Omit<FieldOptions, 'nullable'>;

export function OptionalField(): PropertyDecorator & MethodDecorator;
export function OptionalField(fieldOptions: Options): PropertyDecorator & MethodDecorator;
export function OptionalField(returnTypeFunction: ReturnTypeFunc): PropertyDecorator & MethodDecorator;
export function OptionalField(
  typeOrOptions: ReturnTypeFunc | Options,
  options?: Options
): PropertyDecorator & MethodDecorator;
export function OptionalField(
  typeOrOptions: ReturnTypeFunc | Options = {},
  options: Options = {}
): PropertyDecorator & MethodDecorator {
  return typeof typeOrOptions === 'object'
    ? Field({ nullable: true, ...typeOrOptions })
    : Field(typeOrOptions, { nullable: true, ...options });
}
