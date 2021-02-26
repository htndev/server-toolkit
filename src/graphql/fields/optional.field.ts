import { Field, FieldOptions } from '@nestjs/graphql';

export function OptionalField(): PropertyDecorator & MethodDecorator;
export function OptionalField(fieldOptions: Omit<FieldOptions, 'nullable'>): PropertyDecorator & MethodDecorator;
export function OptionalField(fieldOptions: Omit<FieldOptions, 'nullable'> = {}): PropertyDecorator & MethodDecorator {
  return Field({ nullable: true, ...fieldOptions });
}
