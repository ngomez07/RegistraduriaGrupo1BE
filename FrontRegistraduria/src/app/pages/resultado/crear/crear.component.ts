import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Resultado } from '../../../modelos/resultado.model';
import { CandidatoService } from '../../../servicios/candidato.service';
import { MesaService } from '../../../servicios/mesa.service';
import { ResultadoService } from '../../../servicios/resultado.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  resultado: Resultado = {
    numero_votos: ''
  }
  modoCreacion = true;
  idResultado;
  candidatos = [];
  mesas = [];
  idCandidato;
  idMesa;
  constructor(private miServicioResultado: ResultadoService, private miServicioCandidato: CandidatoService, private miServicioMesa: MesaService, private router: Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarCandidatos();
    this.listarMesas();
    if (this.rutaActiva.snapshot.params.id_resultado){
      this.modoCreacion = false;
      this.idResultado = this.rutaActiva.snapshot.params.id_resultado;
      this.consulta();
    }
  }


  consulta() {
    this.miServicioResultado.consulta(this.idResultado).subscribe(
      data => {
        this.resultado = data;
        this.idCandidato = this.resultado.candidato._id;
        this.idMesa = this.resultado.mesa._id;
      }
    )
  }

  listarCandidatos(){
    this.miServicioCandidato.listar().subscribe(
      data => {
        this.candidatos = data;
      }
    )
  }

  listarMesas(){
    this.miServicioMesa.listar().subscribe(
      data => {
        this.mesas = data;
      }
    )
  }

  ejecutar(){
    if (this.modoCreacion) {
    this.miServicioResultado.agregar(this.resultado, this.idCandidato, this.idMesa).subscribe(
      data => {
        Swal.fire(
          'Agregado!',
          'El resultado ha sido agregado.',
          'success'
        );
      this.router.navigateByUrl('/pages/resultado/listar')
      }
    )
    } else {
      this.miServicioResultado.editar(this.idResultado, this.resultado, this.idCandidato, this.idMesa).subscribe(
        data => {
          Swal.fire(
            'Editado!',
            'El resultado ha sido editado.',
            'success'
          );
        this.router.navigateByUrl('/pages/resultado/listar')
        }
      )
    }
  }

}


