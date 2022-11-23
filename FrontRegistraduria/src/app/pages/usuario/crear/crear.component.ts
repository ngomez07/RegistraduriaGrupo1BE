import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../modelos/usuario.model';
import { UsuarioService } from '../../../servicios/usuario.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {


  usuario: Usuario = {
    seudonimo: '',
    correo: '',
    contrasena: ''
  }
  modoCreacion = true;
  idUsuario;
  constructor(private miServicioUsuario: UsuarioService, private router: Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_usuario) {
      this.modoCreacion = false;
      this.idUsuario = this.rutaActiva.snapshot.params.id_usuario;
      this.consulta();
    }
  }

  consulta() {
    this.miServicioUsuario.consulta(this.idUsuario).subscribe(
      data => {
        this.usuario = data;
      }
    )
  }

  ejecutar(){
    if (this.modoCreacion) {
    this.miServicioUsuario.agregar(this.usuario).subscribe(
      data => {
        Swal.fire(
          'Agregado!',
          'El usuario ha sido agregado.',
          'success'
        );
      this.router.navigateByUrl('/pages/usuario/listar')
      }
    )
    } else {
      this.miServicioUsuario.editar(this.idUsuario, this.usuario).subscribe(
        data => {
          Swal.fire(
            'Editado!',
            'El usuario ha sido editado.',
            'success'
          );
        this.router.navigateByUrl('/pages/usuario/listar')
        }
      )
    }
  }

}
