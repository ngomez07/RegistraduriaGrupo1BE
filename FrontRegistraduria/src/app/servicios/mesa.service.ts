import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Mesa } from '../modelos/mesa.model';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(environment.url_gateway + '/mesas');
  }

  eliminar(id): Observable<Mesa> {
    return this.http.delete<Mesa>(environment.url_gateway + '/mesas/' + id);
  }

  agregar(infoMesa) {
    return this.http.post(environment.url_gateway + '/mesas', infoMesa);
  }

  consulta(id) {
    return this.http.get(environment.url_gateway + '/mesas/' + id);
  }

  editar(id, infoMesa) {
    return this.http.put(environment.url_gateway + '/mesas/' + id, infoMesa);
  }
}
