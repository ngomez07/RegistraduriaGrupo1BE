import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Permiso } from '../modelos/permiso.model';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(environment.url_gateway + '/permisos');
  }

  eliminar(id): Observable<Permiso> {
    return this.http.delete<Permiso>(environment.url_gateway + '/permisos/' + id);
  }

  agregar(infoPermiso) {
    return this.http.post(environment.url_gateway + '/permisos', infoPermiso);
  }

  consulta(id) {
    return this.http.get(environment.url_gateway + '/permisos/' + id);
  }

  editar(id, infoPermiso) {
    return this.http.put(environment.url_gateway + '/permisos/' + id, infoPermiso);
  }
}
