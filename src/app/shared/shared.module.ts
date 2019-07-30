import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatorComponent} from './paginator/paginator.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CacheService} from './cache.service';
import {CacheInterceptorService} from './cache-interceptor.service';

@NgModule({
  declarations: [
    PaginatorComponent
  ],
  exports: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptorService, multi: true }
  ],
})
export class SharedModule { }
