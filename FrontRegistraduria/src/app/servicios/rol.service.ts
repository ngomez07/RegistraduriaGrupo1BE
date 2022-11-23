import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rol } from '../modelos/rol.model';


@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Rol[]> {
    return this.http.get<Rol[]>(environment.url_gateway + '/roles');
  }

  eliminar(id): Observable<Rol> {
    return this.http.delete<Rol>(environment.url_gateway + '/roles/' + id);
  }

  agregar(infoRol) {
    return this.http.post(environment.url_gateway + '/roles', infoRol);
  }

  consulta(id) {
    return this.http.get(environment.url_gateway + '/roles/' + id);
  }

  editar(id, infoRol) {
    return this.http.put(environment.url_gateway + '/roles/' + id, infoRol);
  }
}

