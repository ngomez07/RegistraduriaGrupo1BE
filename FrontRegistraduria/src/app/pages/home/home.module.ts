import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ListarComponent } from './listar/listar.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [
    ListarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class HomeModule { }
