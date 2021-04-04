import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { AuthenticationService } from '../auth-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  private UPLOAD_URL_PATTERN = 'https://delivery-sender-email-attachments.s3.sa-east-1.amazonaws.com';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf(this.UPLOAD_URL_PATTERN) > -1) {
      return next.handle(request);
    }
    const token = this.authenticationService.userToken;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].indexOf(err.status) !== -1) {
        this.authenticationService.logout();
      }
      return throwError(err);
    }));
  }
}
