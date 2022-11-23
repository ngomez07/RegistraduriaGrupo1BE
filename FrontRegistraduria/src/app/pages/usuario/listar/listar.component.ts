import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../servicios/usuario.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  columnas = ['Seudónimo', 'Correo', 'Opciones'];
  usuarios = []
  constructor(private miServicioUsuario: UsuarioService, private router: Router) { 
    this.listar();
  }

  ngOnInit(): void {
  }

  listar() {
    this.miServicioUsuario.listar().subscribe(
      data => {
        this.usuarios = data;
      }
    )
  }

  crear(){
    this.router.navigateByUrl('/pages/usuario/crear'); 
  }

  editar(id){
    this.router.navigateByUrl('/pages/usuario/actualizar/' + id); 
  }

  eliminar(usuario) {
    Swal.fire({
      title: '¿Estás seguro de eliminar el usuario: ' + usuario.seudonimo + ' ' + usuario.correo + '?',
      text: "Si eliminas el usuario no lo podrás recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.miServicioUsuario.eliminar(usuario._id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            )
            this.listar();
          }
        )
        
      }
    })
    
  }

}
