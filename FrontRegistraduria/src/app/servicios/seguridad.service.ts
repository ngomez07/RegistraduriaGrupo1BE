import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  usuario = new BehaviorSubject<Usuario>(new Usuario);
  constructor(private http: HttpClient) { 
    this.verificarSesionActual();
  }

  public get usuarioSesionActiva(): Usuario {
    return this.usuario.value;
  }

  setUsuario(user: Usuario) {
    this.usuario.next(user)
  }

  login(infoUsuario: Usuario): Observable<Usuario> {
    return this.http.post(environment.url_gateway + "/login", infoUsuario);
  }

  guardarDatosSesion(datosSesion){
    let usuario: Usuario = {
      _id: datosSesion.user_id,
      token: datosSesion.token
    }
    localStorage.setItem('sesion', JSON.stringify(usuario));
    this.setUsuario(usuario);
  }

  getDatosSesion() {
    return localStorage.getItem('sesion');
  }

  verificarSesionActual() {
    let sesion = this.getDatosSesion();
    if (sesion) {
      this.setUsuario(JSON.parse(sesion))
    }
  }
}
