import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatoRoutingModule } from './candidato-routing.module';
import { FormsModule } from '@angular/forms';
import { NbCardModule } from '@nebular/theme';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from '../candidato/crear/crear.component';


@NgModule({
  declarations: [ 
    ListarComponent,
    CrearComponent
  ],
  imports: [
    CommonModule,
    CandidatoRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class CandidatoModule { }
