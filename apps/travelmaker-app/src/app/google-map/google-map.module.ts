import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../shared/services/map.service';
import { GoogleMapService } from './services/google-map.service';


@NgModule({
  declarations: [],
  providers: [
    { provide: MapService, useClass: GoogleMapService },
  ],
  imports: [
    CommonModule,
  ],
})
export class GoogleMapModule { }
