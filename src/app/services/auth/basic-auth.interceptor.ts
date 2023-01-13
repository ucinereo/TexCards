import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError} from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import {ErrorService} from "../error.service";

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private errorService: ErrorService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('username') && localStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem('token')!
        }
      })
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (this.router.url.match('.*login.*') || this.router.url.match('.*register.*')) {
          // custom error handling for login and register page
          return throwError(err);
        }

        if (err.status == 401) {
          if (!err.url.includes("auth")) {
            this.authService.logOut();
            this.router.navigate(['login']);
          }
        } else {
          let errorMsg = err.error.message;
          if (err.status == 0) {
            // indication that backend could not be reached
            errorMsg = "Could not reach server, check your internet connection!";
          } else if (errorMsg == undefined || errorMsg == "" || errorMsg.includes('/') || errorMsg.includes('.')) {
            errorMsg = "-";
          }
          this.errorService.emit("error", errorMsg);
        }
        return throwError(err);
      })
    );
  }

}
