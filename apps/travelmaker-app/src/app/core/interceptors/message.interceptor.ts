import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

import { NotificationBarService } from '../../shared/components/notification-bar/notification-bar.service';
import { ApiErrorResponse, ApiSuccessResponse } from '../models/ApiResponse.model';



@Injectable()
export class MessageInterceptor implements HttpInterceptor {

  constructor(private notificationBarService: NotificationBarService) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap(this.handleSuccessfulResponse),
      catchError(this.handleError),
    )
  }

  private handleSuccessfulResponse = (event: HttpEvent<ApiSuccessResponse<unknown>>): void => {
    if (event instanceof HttpResponse) {
      const responseData = event.body;
      if (responseData?.meta?.message) {
        this.notificationBarService.showSuccess(responseData.meta.message);
      }
    }
  }

  private handleError = (error: Error | HttpErrorResponse): Observable<never> => {
    if (error instanceof HttpErrorResponse) {
      const errorResponseData: ApiErrorResponse | null = error.error;
      if (errorResponseData?.message) {
        this.notificationBarService.showError(errorResponseData.message);
      }
    }
    return throwError(() => error);
  }
}
