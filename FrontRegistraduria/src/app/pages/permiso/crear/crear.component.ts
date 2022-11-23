import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Permiso } from '../../../modelos/permiso.model';
import { PermisoService } from '../../../servicios/permiso.service';
 
@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  permiso: Permiso = {
    url: '',
    metodo: ''
  }
  modoCreacion = true;
  idPermiso;

  constructor(private miServicioPermiso: PermisoService, private router: Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_permiso) {
      this.modoCreacion = false;
      this.idPermiso = this.rutaActiva.snapshot.params.id_permiso;
      this.consulta();
    }
  }

  consulta() {
    this.miServicioPermiso.consulta(this.idPermiso).subscribe(
      data => {
        this.permiso = data;
      }
    )
  }

  ejecutar(){
    if (this.modoCreacion) {
    this.miServicioPermiso.agregar(this.permiso).subscribe(
      data => {
        Swal.fire(
          'Agregado!',
          'El permiso ha sido agregado.',
          'success'
        );
      this.router.navigateByUrl('/pages/permiso/listar')
      }
    )
    } else {
      this.miServicioPermiso.editar(this.idPermiso, this.permiso).subscribe(
        data => {
          Swal.fire(
            'Editado!',
            'El permiso ha sido editado.',
            'success'
          );
        this.router.navigateByUrl('/pages/permiso/listar')
        }
      )
    }
  }

}
