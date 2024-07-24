import {
    HttpEvent,
    HttpHandlerFn,
    HttpHeaders,
    HttpRequest,
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  
  export function TokenInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<unknown>> {
    if (
      req.url === 'http://localhost:2000/auth/register' ||
      req.url === 'http://localhost:2000/auth/login' ||
      req.url === 'http://localhost:2000/polls'||
      req.url === 'http://localhost:2000/views'
    ) {
      return next(req);
    } else {
      const token = localStorage.getItem('token') as string;
      const modifiedReq = req.clone({
        headers: new HttpHeaders().append('token', token),
      });
      return next(modifiedReq);
    }
  }
  