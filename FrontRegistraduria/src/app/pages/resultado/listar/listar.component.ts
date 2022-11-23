import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ResultadoService } from '../../../servicios/resultado.service';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  columnas = ['Candidato', 'Numero de Mesa', 'Resultado (número de votos)', 'Opciones'];
  resultados = []
  constructor(private miServicioResultado: ResultadoService, private router: Router) { 
    this.listar();
  }

  ngOnInit(): void {
  }

  listar() {
    this.miServicioResultado.listar().subscribe(
      data => {
        this.resultados = data;
      }
    )
  }

  crear(){
    this.router.navigateByUrl('/pages/resultado/crear'); 
  }

  editar(id){
    this.router.navigateByUrl('/pages/resultado/actualizar/' + id); 
  }

  eliminar(resultado) {
    Swal.fire({
      title: '¿Estas seguro de eliminar el resultado del candidato: ' + resultado.candidato?.nombre + '?',
      text: "Si eliminas el resultado no lo podras recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.miServicioResultado.eliminar(resultado._id).subscribe(
          data => {
            Swal.fire(
              'Eliminado!',
              'El resultado ha sido eliminado.',
              'success'
            )
            this.listar();
          }
        )
        
      }
    })
    
  }
}
