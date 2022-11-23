import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../../modelos/rol.model';
import { RolService } from '../../../servicios/rol.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  rol: Rol = {
    nombre: '',
    descripcion: ''
  }
  modoCreacion = true;
  idRol;

  constructor(private miServicioRol: RolService, private router: Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_rol) {
      this.modoCreacion = false;
      this.idRol = this.rutaActiva.snapshot.params.id_rol;
      this.consulta();
    }
  }

  consulta() {
    this.miServicioRol.consulta(this.idRol).subscribe(
      data => {
        this.rol = data;
      }
    )
  }

  ejecutar(){
    if (this.modoCreacion) {
    this.miServicioRol.agregar(this.rol).subscribe(
      data => {
        Swal.fire(
          'Agregado!',
          'El rol ha sido agregado.',
          'success'
        );
      this.router.navigateByUrl('/pages/rol/listar')
      }
    )
    } else {
      this.miServicioRol.editar(this.idRol, this.rol).subscribe(
        data => {
          Swal.fire(
            'Editado!',
            'El rol ha sido editado.',
            'success'
          );
        this.router.navigateByUrl('/pages/rol/listar')
        }
      )
    }
  }

}
