import { GraphQLError } from 'graphql';

export const formatGqlError = (isDevelopmentMode: boolean) => (error: GraphQLError): GraphQLError => {
  if (isDevelopmentMode) {
    return error;
  }

  delete error.extensions?.exception.stacktrace;

  return error;
};
