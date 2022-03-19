import { Injectable, NestInterceptor, CallHandler, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Observable, tap } from 'rxjs';


@Injectable()
export class NotFoundInterceptor<T> implements NestInterceptor<T, T[]> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<T[]> {
    return next.handle()
      .pipe(tap((data: T[]) => {
        if (data.length === 0) throw new NotFoundException();
      }));
  }
}
