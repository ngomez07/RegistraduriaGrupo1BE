import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Partido } from '../modelos/partido.model';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Partido[]> {
    return this.http.get<Partido[]>(environment.url_gateway + '/partidos');
  }

  eliminar(id): Observable<Partido> {
    return this.http.delete<Partido>(environment.url_gateway + '/partidos/' + id);
  }

  agregar(infoPartido) {
    return this.http.post(environment.url_gateway + '/partidos', infoPartido);
  }

  consulta(id) {
    return this.http.get(environment.url_gateway + '/partidos/' + id);
  }

  editar(id, infoPartido) {
    return this.http.put(environment.url_gateway + '/partidos/' + id, infoPartido);
  }
}
