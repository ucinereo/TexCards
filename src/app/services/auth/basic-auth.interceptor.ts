import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError} from "rxjs";
import {catchError, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')!
        }
      })
    }
    return next.handle(request).pipe(
      catchError((err) => {
        let errorCode = err.status;
        let errorMsg = err.error.message;
        if (errorMsg == undefined || errorMsg == null || errorMsg == "" || errorMsg.includes('/') || errorMsg.includes('.')) {
          errorMsg = "-";
        }
        if (errorCode == undefined || errorCode == null || errorCode == "") {
          errorCode = "500";
        }
        if (err.status == 401) {
          if (!err.url.includes("auth")) {
            this.authService.logOut();
            this.router.navigate(['login']);
          }
        } else if (err.status == 500) {
          this.router.navigate(['error/' + 500 + "/" + errorMsg]);
        } else if (err.status == 403) {
          this.router.navigate(['error/' + 403 + "/" + errorMsg]);
        } else if (err.status == 404) {
          this.router.navigate(['error/' + 404 + "/" + errorMsg]);
        } else {
          if (!(err.url.includes("auth") && errorCode == 400))
          this.router.navigate(['error/' + errorCode + "/" + errorMsg]);
        }
        return throwError(err);
      })
    );
  }

}
