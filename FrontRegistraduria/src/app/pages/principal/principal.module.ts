import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { IngresarComponent } from './ingresar/ingresar.component';
import { NbCardModule } from '@nebular/theme';
import { FormsModule } from '../forms/forms.module';


@NgModule({
  declarations: [
    IngresarComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    NbCardModule,
    FormsModule
  ]
})
export class PrincipalModule { }
