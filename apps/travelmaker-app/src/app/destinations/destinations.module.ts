import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../shared/material/material.module';
import * as fromDestinations from './+state/destinations.reducer';
import { DestinationsEffects } from './+state/destinations.effects';
import { DestinationsFacade } from './+state/destinations.facade';
import { DestinationsComponent } from './destinations.component';
import { DestinationsRoutingModule } from './destinations-routing.module';


@NgModule({
  declarations: [
    DestinationsComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromDestinations.DESTINATIONS_FEATURE_KEY,
      fromDestinations.reducer
    ),
    EffectsModule.forFeature([DestinationsEffects]),
    DestinationsRoutingModule,
    MaterialModule,
  ],
  providers: [DestinationsFacade],
})
export class DestinationsModule {}
