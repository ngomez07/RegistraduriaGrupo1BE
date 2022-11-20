import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
  }

  Partido(){
    this.router.navigateByUrl('/pages/partido/listar'); 
  }
  Mesa(){
    this.router.navigateByUrl('/pages/mesa/listar'); 
  }
  Candidato(){
    this.router.navigateByUrl('/pages/candidato/listar'); 
  }
  Resultado(){
    this.router.navigateByUrl('/pages/resultado/listar'); 
  }
  Usuario(){
    this.router.navigateByUrl('/pages/usuario/listar'); 
  }
  Rol(){
    this.router.navigateByUrl('/pages/rol/listar'); 
  }
  Permiso(){
    this.router.navigateByUrl('/pages/permiso/listar'); 
  }
}
