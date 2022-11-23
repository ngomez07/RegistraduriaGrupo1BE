import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidato } from '../../../modelos/candidato.model';
import { CandidatoService } from '../../../servicios/candidato.service';
import { PartidoService } from '../../../servicios/partido.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  candidato: Candidato = {
    cedula: '',
    nombre: '',
    apellido: '',
    numero_resolucion: ''
  }
  modoCreacion = true;
  idCandidato;
  partidos = [];
  idPartido;
  constructor(private miServicioCandidato: CandidatoService, private miServicioPartido: PartidoService, private router: Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarPartidos();
    if (this.rutaActiva.snapshot.params.id_candidato) {
      this.modoCreacion = false;
      this.idCandidato = this.rutaActiva.snapshot.params.id_candidato;
      this.consulta();
    }
  }

  consulta() {
    this.miServicioCandidato.consulta(this.idCandidato).subscribe(
      data => {
        this.candidato = data;
      }
    )
  }

  listarPartidos(){
    this.miServicioPartido.listar().subscribe(
      data => {
        this.partidos = data;
      }
    )
  }

  ejecutar(){
    if (this.modoCreacion) {
    this.miServicioCandidato.agregar(this.candidato).subscribe(
      data => {
        this.miServicioCandidato.asignarPartido(data['_id'], this.idPartido).subscribe(
          data => {
          Swal.fire(
            'Agregado!',
            'El candidato ha sido agregado.',
            'success'
          );
        this.router.navigateByUrl('/pages/candidato/listar')
          }
        ) 
      }
    )
    } else {
      this.miServicioCandidato.editar(this.idCandidato, this.candidato).subscribe(
        data => {
          this.miServicioCandidato.asignarPartido(data['_id'], this.idPartido).subscribe(
            data => {
            Swal.fire(
              'Editado!',
              'El candidato ha sido editado.',
              'success'
            );
          this.router.navigateByUrl('/pages/candidato/listar')
            }
          ) 
        }
      )
    }
  }

}
