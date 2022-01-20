export type ApiSuccessResponse<T> = {
  data: T
}

export type ApiErrorResponse = {
}

export type ApiResponse<T> = ApiSuccessResponse<T> & ApiErrorResponse
