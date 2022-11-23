import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts';
import Swal from 'sweetalert2';
import { PermisoService } from '../../../servicios/permiso.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  columnas = ['Url', 'Método', 'Opciones'];
  permisos =[]
  constructor(private miServicioPermiso: PermisoService, private router: Router) {
    this.listar();
   }

  ngOnInit(): void {
  }

  listar(){
    this.miServicioPermiso.listar().subscribe(
      data => {
        this.permisos = data;
      }
    )
  }

  crear(){
    this.router.navigateByUrl('/pages/permiso/crear');
  }

  editar(id){
    this.router.navigateByUrl('/pages/permiso/actualizar/' + id); 
  }

  eliminar(permiso) {
    Swal.fire({
      title: '¿Estas seguro de eliminar el permiso: ' + permiso.url + '?',
      text: "Si eliminas el permiso no lo podras recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.miServicioPermiso.eliminar(permiso._id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'El permiso ha sido eliminado.',
              'success'
            )
            this.listar();
          }
        )
        
      }
    })
    
  }


}
