import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RolService } from '../../../servicios/rol.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  columnas = ['Nombre', 'Descripción', 'Opciones'];
  roles = []
  constructor(private miServicioRol: RolService, private router: Router) {
    this.listar();
  }

  ngOnInit(): void {
  }

  listar() {
    this.miServicioRol.listar().subscribe(
      data => {
        this.roles = data;
      }
    )
  }

  crear(){
    this.router.navigateByUrl('/pages/rol/crear');
  }

  editar(id){
    this.router.navigateByUrl('/pages/rol/actualizar/' + id);
  }

  eliminar(rol) {
    Swal.fire({
      title: '¿Estas seguro de eliminar el rol: ' + rol.nombre + '?',
      text: "Si eliminas el rol no lo podras recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.miServicioRol.eliminar(rol._id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'El rol ha sido eliminado.',
              'success'
            )
            this.listar();
          }
        )

      }
    })

  }
}

