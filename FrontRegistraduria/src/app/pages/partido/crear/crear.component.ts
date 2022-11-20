import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Partido } from '../../../modelos/partido.model';
import { PartidoService } from '../../../servicios/partido.service';
 
@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  partido: Partido = {
    nombre: '',
    lema: ''
  }
  modoCreacion = true;
  idPartido;

  constructor(private miServicioPartido: PartidoService, private router: Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_partido) {
      this.modoCreacion = false;
      this.idPartido = this.rutaActiva.snapshot.params.id_partido;
      this.consulta();
    }
  }

  consulta() {
    this.miServicioPartido.consulta(this.idPartido).subscribe(
      data => {
        this.partido = data;
      }
    )
  }

  ejecutar(){
    if (this.modoCreacion) {
    this.miServicioPartido.agregar(this.partido).subscribe(
      data => {
        Swal.fire(
          'Agregado!',
          'El partido ha sido agregado.',
          'success'
        );
      this.router.navigateByUrl('/pages/partido/listar')
      }
    )
    } else {
      this.miServicioPartido.editar(this.idPartido, this.partido).subscribe(
        data => {
          Swal.fire(
            'Editado!',
            'El partido ha sido editado.',
            'success'
          );
        this.router.navigateByUrl('/pages/partido/listar')
        }
      )
    }
  }

}
