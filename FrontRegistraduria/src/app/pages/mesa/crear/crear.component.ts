import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Mesa } from '../../../modelos/mesa.model';
import { MesaService } from '../../../servicios/mesa.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  mesa: Mesa = {
    numero: '',
    cantidad_inscritos: ''
  }
  modoCreacion = true;
  idMesa;

  constructor(private miServicioMesa: MesaService, private router: Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_mesa) {
      this.modoCreacion = false;
      this.idMesa = this.rutaActiva.snapshot.params.id_mesa;
      this.consulta();
    }
  }

  consulta() {
    this.miServicioMesa.consulta(this.idMesa).subscribe(
      data => {
        this.mesa = data;
      }
    )
  }

  ejecutar(){
    if (this.modoCreacion) {
    this.miServicioMesa.agregar(this.mesa).subscribe(
      data => {
        Swal.fire(
          'Agregado!',
          'La mesa ha sido agregada.',
          'success'
        );
      this.router.navigateByUrl('/pages/mesa/listar')
      }
    )
    } else {
      this.miServicioMesa.editar(this.idMesa, this.mesa).subscribe(
        data => {
          Swal.fire(
            'Editado!',
            'La mesa ha sido editada.',
            'success'
          );
        this.router.navigateByUrl('/pages/mesa/listar')
        }
      )
    }
  }

}
