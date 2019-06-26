import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastMessageService } from '../services/toast-message.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService implements HttpInterceptor {

  constructor(private toastCtrl: ToastMessageService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const reqClone = req.clone();
    return next.handle(reqClone).pipe(
      catchError( (error: HttpErrorResponse) => {
        this.toastCtrl.mostrarToast(error.message);
        return throwError(error.message);
      })
    );
  }
}
