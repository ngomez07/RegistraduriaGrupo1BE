import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PartidoService } from '../../../servicios/partido.service';
 
@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  columnas = ['Nombre', 'Lema', 'Opciones'];
  partidos = []
  constructor(private miServicioPartido: PartidoService, private router: Router) { 
    this.listar();
  }

  ngOnInit(): void {
  }

  listar() {
    this.miServicioPartido.listar().subscribe(
      data => {
        this.partidos = data;
      }
    )
  }

  crear(){
    this.router.navigateByUrl('/pages/partido/crear'); 
  }

  editar(id){
    this.router.navigateByUrl('/pages/partido/actualizar/' + id); 
  }

  eliminar(partido) {
    Swal.fire({
      title: '¿Estas seguro de eliminar el partido: ' + partido.nombre + '?',
      text: "Si eliminas el partido no lo podras recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.miServicioPartido.eliminar(partido._id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'El partido ha sido eliminado.',
              'success'
            )
            this.listar();
          }
        )
        
      }
    })
    
  }
}
