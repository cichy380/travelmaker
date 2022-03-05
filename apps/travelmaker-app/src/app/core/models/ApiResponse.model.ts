export type ApiSuccessResponse<T> = {
  data: T;
  meta?: {
    message?: string;
  };
}

export type ApiErrorResponse = {
  message?: string;
  details?: { [formFieldName in string]: ApiFieldError }
}

type ApiFieldError = {
  kind: string;
  message: string;
  name: 'ValidatorError';
  path: string;
  properties: {
    message: string;
    path: string;
    type: string;
    value: string;
  }
  value: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> & ApiErrorResponse
