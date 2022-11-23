import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Resultado } from '../modelos/resultado.model';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  constructor(private http: HttpClient) { }

  listar(): Observable<Resultado[]> {
    return this.http.get<Resultado[]>(environment.url_gateway + '/resultados');
  }

  eliminar(id): Observable<Resultado> {
    return this.http.delete<Resultado>(environment.url_gateway + '/resultados/' + id);
  }

  agregar(infoResultado, id_candidato, id_mesa) {
    return this.http.post(environment.url_gateway + '/resultados/candidato/' + id_candidato + '/mesa/' + id_mesa, infoResultado );
  }

  consulta(id) {
    return this.http.get(environment.url_gateway + '/resultados/' + id);
  }

  editar(id_resultado, infoResultado, id_candidato, id_mesa) {
    return this.http.put(environment.url_gateway + '/resultados/' + id_resultado + '/candidato/' + id_candidato + '/mesa/' + id_mesa, infoResultado);
  }
  
}
