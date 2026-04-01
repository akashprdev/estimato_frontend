import axios, { type AxiosError, type HttpStatusCode } from 'axios';

import {
  APIError,
  APIServerError,
  HTTPError,
  NetworkError,
  ValidationAPIError,
} from './errors';

import { auth } from '@/auth';
import { inRange } from '@/utilities/utilities';

/**
 * Type for axios error with response
 */
type AxiosErrorWithResponse = AxiosError & {
  response: {
    status: HttpStatusCode;
    data: unknown;
  };
  message: string;
};

/**
 * Backend error response for HTTPException (4xx errors)
 *
 * Based on the model here: https://sourcecode.jnj.com/projects/asx-jedu/repos/genai-appservice-fastapi/browse/app/middleware/exceptions.py?at=fa96a8e8c5b2aabbc05beea10e972326d13ed19d#14-19
 */
export interface HTTPExceptionResponse {
  /** The error message from the backend */
  error: string;
}

/**
 * Backend error response for general Exception (5xx errors)
 *
 * Based on the model here: https://sourcecode.jnj.com/projects/asx-jedu/repos/genai-appservice-fastapi/browse/app/middleware/exceptions.py?at=fa96a8e8c5b2aabbc05beea10e972326d13ed19d#20-30
 */
export interface GeneralExceptionResponse {
  /** The error class name */
  error: string;
  /** The error message */
  message: string;
  /** The error traceback */
  traceback: string;
}

/**
 * Backend error response for validation errors (422 Unprocessable Entity)
 */
export interface ValidationExceptionResponse {
  /**
   * List of validation error details.
   */
  error: {
    /** Type of error (e.g., 'value_error') */
    type: string;
    /** Location of the error in the request */
    loc: string[];
    /** Error message */
    msg: string;
    /** Input data that caused the error */
    input: Record<string, unknown>;
    /** Error context */
    ctx: {
      /** Additional error details */
      error: Record<string, unknown>;
    };
  }[];
}

/**
 * Union type for all possible backend error responses
 */
export type BackendErrorResponse =
  | HTTPExceptionResponse
  | GeneralExceptionResponse
  | ValidationExceptionResponse;

/**
 * Type guard to check if an unknown value is a valid backend error response.
 *
 * @param response - The value to check
 * @returns        Whether the value is a valid backend error response
 */
export const isBackendErrorResponse = (
  response: unknown
): response is BackendErrorResponse => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'error' in response &&
    (typeof response.error === 'string' || Array.isArray(response.error))
  );
};

export const isHTTPExceptionResponse = (
  response: BackendErrorResponse
): response is HTTPExceptionResponse => {
  return (
    'error' in response &&
    typeof response.error === 'string' &&
    !('message' in response) &&
    !('traceback' in response)
  );
};

/**
 * Type guard to check if error response is a general exception.
 *
 * @param response - The backend error response to check
 * @returns        Whether the response is a general exception response
 */
export const isGeneralExceptionResponse = (
  response: BackendErrorResponse
): response is GeneralExceptionResponse => {
  return (
    'message' in response &&
    'traceback' in response &&
    typeof response.error === 'string'
  );
};

export const isValidationErrorResponse = (
  response: BackendErrorResponse
): response is ValidationExceptionResponse => {
  return 'error' in response && Array.isArray(response.error);
};

/**
 * Handles 4xx client errors by throwing an APIError.
 *
 * @param errorData - The backend error response data
 * @param status    - The HTTP status code
 */
const handleClientError = (
  errorData: HTTPExceptionResponse,
  status: number
): never => {
  throw new APIError(errorData.error, status);
};

/**
 * Handles 5xx server errors by throwing an APIServerError.
 *
 * @param errorData - The backend error response data
 * @param status    - The HTTP status code
 */
const handleServerError = (
  errorData: GeneralExceptionResponse | HTTPExceptionResponse,
  status: number
): never => {
  if (isGeneralExceptionResponse(errorData)) {
    throw new APIServerError(errorData.message || errorData.error, status);
  }
  throw new APIServerError(errorData.error, status);
};

const handleValidationError = (
  errorData: ValidationExceptionResponse,
  status: number
): never => {
  throw new ValidationAPIError('Validation error', status, errorData.error);
};

/**
 * Handles HTTP response errors from the server.
 *
 * @param error - Axios error with response
 */
const handleResponseError = (error: AxiosErrorWithResponse): never => {
  const status = error.response.status;
  const responseData = error.response.data;

  if (!isBackendErrorResponse(responseData)) {
    throw new HTTPError(error.message, status);
  }

  const errorData = responseData;

  // Handle validation errors (422 Unprocessable Entity)
  if (
    status === axios.HttpStatusCode.UnprocessableEntity &&
    isValidationErrorResponse(errorData)
  ) {
    return handleValidationError(errorData, status);
  }

  // Handle 4xx client errors
  if (
    inRange(
      status,
      axios.HttpStatusCode.BadRequest,
      axios.HttpStatusCode.InternalServerError
    ) &&
    isHTTPExceptionResponse(errorData)
  ) {
    return handleClientError(errorData, status);
  }

  // Handle 5xx server errors
  if (
    inRange(status, axios.HttpStatusCode.InternalServerError, 600) &&
    (isGeneralExceptionResponse(errorData) ||
      isHTTPExceptionResponse(errorData))
  ) {
    return handleServerError(errorData, status);
  }

  // Handle any other HTTP errors
  throw new HTTPError(
    typeof errorData.error === 'string' ? errorData.error : 'Unknown error',
    status
  );
};

/**
 * Handles network errors (no response received).
 *
 * @param request - The axios request object
 */
const handleNetworkError = (request: unknown): never => {
  throw new NetworkError(
    'Network error: No response received from server',
    request
  );
};

/**
 * Handles non-axios errors.
 *
 * @param error - The error that occurred
 */
const handleNonAxiosError = (error: unknown): never => {
  throw error instanceof Error
    ? error
    : new Error('Unknown error during API request');
};

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HTTP_URL,
  paramsSerializer: {
    // The `null` value is valid for the `indexes` key within `axios`'s
    // `paramsSerializer` configuration; see
    // <https://github.com/axios/axios/issues/5058#issuecomment-1272107602> for
    // more information.
    indexes: null,
  },
});

api.interceptors.request.use(async (config) => {
  const accessToken = await auth?.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Reference: https://axios-http.com/docs/handling_errors

    if (!axios.isAxiosError(error)) {
      return handleNonAxiosError(error);
    }

    if (error.response) {
      return handleResponseError(error as AxiosErrorWithResponse);
    }

    if (error.request) {
      return handleNetworkError(error.request);
    }

    // Something happened in setting up the request that triggered an Error
    throw new Error(`Axios request error: ${error.message}`, {
      cause: error,
    });
  }
);

export { api };
