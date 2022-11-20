import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidato } from '../modelos/candidato.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(environment.url_gateway + '/candidatos');
  }

  eliminar(id): Observable<Candidato> {
    return this.http.delete<Candidato>(environment.url_gateway + '/candidatos/' + id);
  }

  agregar(infoCandidato) {
    return this.http.post(environment.url_gateway + '/candidatos', infoCandidato);
  }

  consulta(id) {
    return this.http.get(environment.url_gateway + '/candidatos/' + id);
  }

  editar(id, infoCandidato) {
    return this.http.put(environment.url_gateway + '/candidatos/' + id, infoCandidato);
  }
}
