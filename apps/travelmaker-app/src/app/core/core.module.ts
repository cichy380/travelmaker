import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageInterceptor } from './interceptors/message.interceptor';



@NgModule({
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MessageInterceptor, multi: true }
  ],
  imports: [
    CommonModule,
  ],
})
export class CoreModule { }
