import { get } from 'lodash';

export class ApiError {
  constructor({ message, status, originalError }) {
    this.message = message;
    this.status = status;
    this.originalError = originalError;
  }

  static from(originalError) {
    const parsedErr = get(originalError, 'graphQLErrors[0]', originalError);
    return new ApiError({
      message: get(parsedErr, 'message', 'Something went wrong'),
      status: get(parsedErr, 'status', 500),
      originalError,
    });
  }
}
