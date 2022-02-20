import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private requestsCount = 0;

  constructor(private loadingService: LoadingService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.setLoadingState(true);
    this.requestsCount++;

    return next.handle(request).pipe(
      finalize(() => {
        this.requestsCount--
        if (this.requestsCount === 0) {
          this.loadingService.setLoadingState(false);
        }
      }),
    )
  }
}
