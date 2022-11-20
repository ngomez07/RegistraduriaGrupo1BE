import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MesaService } from '../../../servicios/mesa.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

columnas = ['Número Mesa', 'Cantidad Inscritos', 'Opciones'];
mesas = []
  constructor(private miServicioMesa: MesaService, private router: Router) { 
    this.listar();
  }

  ngOnInit(): void {
  }

  listar() {
    this.miServicioMesa.listar().subscribe(
      data => {
        this.mesas = data;
      }
    )
  }

  crear(){
    this.router.navigateByUrl('/pages/mesa/crear'); 
  }

  editar(id){
    this.router.navigateByUrl('/pages/mesa/actualizar/' + id); 
  }

  eliminar(mesa) {
    Swal.fire({
      title: '¿Estás seguro de eliminar la mesa: ' + mesa.numero + '?',
      text: "Si eliminas la mesa no la podrás recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.miServicioMesa.eliminar(mesa._id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'La mesa ha sido eliminada.',
              'success'
            )
            this.listar();
          }
        )
        
      }
    })
    
  }
}
