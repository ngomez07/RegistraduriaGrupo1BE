import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(environment.url_gateway + '/usuarios');
  }

  eliminar(id): Observable<Usuario> {
    return this.http.delete<Usuario>(environment.url_gateway + '/usuarios/' + id);
  }

  agregar(infoUsuario) {
    return this.http.post(environment.url_gateway + '/usuarios', infoUsuario);
  }

  consulta(id) {
    return this.http.get(environment.url_gateway + '/usuarios/' + id);
  }

  editar(id, infoUsuario) {
    return this.http.put(environment.url_gateway + '/usuarios/' + id, infoUsuario);
  }
}
