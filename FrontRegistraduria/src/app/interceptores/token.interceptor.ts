import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { SeguridadService } from '../servicios/seguridad.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public miServicioSeguridad: SeguridadService, public router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.miServicioSeguridad.usuarioSesionActiva) {
      request = request.clone(
        {
          setHeaders:{
            Authorization: "Bearer " + this.miServicioSeguridad.usuarioSesionActiva.token
          }
        }
      )
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401){
          this.router.navigateByUrl('pages/seguridad/login');
        }
        return throwError(err);
      }
      ))
  }
}
