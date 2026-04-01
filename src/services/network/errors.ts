import { type HttpStatusCode } from 'axios';

import type { ValidationExceptionResponse } from './network';

/**
 * Validation error class for API validation error responses.
 * Used when backend returns validation errors for client input.
 */
export class ValidationAPIError extends Error {
  /**
   * Creates a ValidationAPIError instance.
   *
   * @param message - The error message
   * @param status  - The HTTP status code
   * @param details - The validation error details from backend
   */
  constructor(
    message: string,
    public readonly status: HttpStatusCode,
    public readonly details: ValidationExceptionResponse['error']
  ) {
    super(message);
    this.name = 'ValidationAPIError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Custom error class for HTTP errors that aren't related to our API.
 * Used for general HTTP failures.
 */
export class HTTPError extends Error {
  /**
   * Creates an HTTPError instance.
   *
   * @param message - The error message
   * @param status  - The HTTP status code
   */
  constructor(
    message: string,
    public readonly status: HttpStatusCode
  ) {
    super(message);
    this.name = 'HTTPError';
    this.status = status;
  }
}

/**
 * Client-facing error with human-readable messages from the backend.
 * Used for client errors (4xx) where the backend provides helpful feedback.
 */
export class APIError extends Error {
  /**
   * Creates a APIError instance.
   *
   * @param message - The human-readable error message from the backend
   * @param status  - The HTTP status code
   */
  constructor(
    message: string,
    public readonly status: HttpStatusCode
  ) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

/**
 * Server error class for API server errors (5xx).
 * Used for server-side errors from the backend.
 */
export class APIServerError extends Error {
  /**
   * Creates an APIServerError instance.
   *
   * @param message - The error message
   * @param status  - The HTTP status code
   */
  constructor(
    message: string,
    public readonly status: HttpStatusCode
  ) {
    super(message);
    this.name = 'APIServerError';
    this.status = status;
  }
}

/**
 * Network error for when the request was made but no response was received.
 * This typically indicates connectivity issues, timeouts, or server unavailability.
 */
export class NetworkError extends Error {
  /**
   * Creates a NetworkError instance.
   *
   * @param message - The error message
   * @param request - The request object that was sent
   */
  constructor(
    message: string,
    public readonly request?: unknown
  ) {
    super(message);
    this.name = 'NetworkError';
    this.request = request;
  }
}
