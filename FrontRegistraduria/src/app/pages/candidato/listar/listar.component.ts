import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CandidatoService } from '../../../servicios/candidato.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  columnas = ['Cédula', 'Nombre Completo', 'Número Resolución', 'Partido', 'Opciones'];
  candidatos = []
  constructor(private miServicioCandidato: CandidatoService, private router: Router) { 
    this.listar();
  }

  ngOnInit(): void {
  }

  listar() {
    this.miServicioCandidato.listar().subscribe(
      data => {
        this.candidatos = data;
      }
    )
  }

  crear(){
    this.router.navigateByUrl('/pages/candidato/crear'); 
  }

  editar(id){
    this.router.navigateByUrl('/pages/candidato/actualizar/' + id); 
  }

  eliminar(candidato) {
    Swal.fire({
      title: '¿Estas seguro de eliminar el candidato: ' + candidato.cedula + ' ' + candidato.nombre + '?',
      text: "Si eliminas el candidato no lo podras recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.miServicioCandidato.eliminar(candidato._id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'El candidato ha sido eliminado.',
              'success'
            )
            this.listar();
          }
        )
        
      }
    })
    
  }

}
