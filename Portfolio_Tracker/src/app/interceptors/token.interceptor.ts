import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { SnackBarService } from '../service/snack-bar.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService,private snackbar:SnackBarService,private router:Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer:${myToken}` }, 
      });
    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.snackbar.showSnackBar("Token is Expired!!Please login again to view the application")
            this.router.navigate(['login'])
          }
        }
        return throwError(()=>{
        new Error("Some other error occurred, Please logout and login again!")
        })
      })
    );
  }
}
