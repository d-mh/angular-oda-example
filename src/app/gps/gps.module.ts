import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpsRoutingModule } from './gps-routing.module';
import { GpsComponent } from './gps.component';


@NgModule({
  declarations: [GpsComponent],
  imports: [
    CommonModule,
    GpsRoutingModule
  ]
})
export class GpsModule { }
