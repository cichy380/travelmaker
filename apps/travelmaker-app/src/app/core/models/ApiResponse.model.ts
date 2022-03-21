import { HttpStatusCode } from '@angular/common/http';

export type ApiSuccessResponse<T> = {
  data: T;
  meta?: {
    message?: string;
  };
}

export type ApiErrorResponse = {
  error: string;
  message: string | null;
  details?: ApiErrorResponseDetails;
  statusCode: HttpStatusCode;
}

export type ApiErrorResponseDetails = { [formFieldName in string]: string };

export type ApiResponse<T> = ApiSuccessResponse<T> & ApiErrorResponse
