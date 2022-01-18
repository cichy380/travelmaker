import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../shared/material/material.module';
import { TranslateWeekdayPipe } from '../shared/pipes/translate-weekday.pipe';
import * as fromDestinations from './+state/destinations.reducer';
import { DestinationsEffects } from './+state/destinations.effects';
import { DestinationsFacade } from './+state/destinations.facade';
import { DestinationsComponent } from './destinations.component';
import { DestinationsRoutingModule } from './destinations-routing.module';
import { DaysOfTheWeekSheetComponent } from './components/days-of-the-week-sheet/days-of-the-week-sheet.component';


@NgModule({
  declarations: [
    DestinationsComponent,
    DaysOfTheWeekSheetComponent,
    TranslateWeekdayPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromDestinations.DESTINATIONS_FEATURE_KEY,
      fromDestinations.reducer
    ),
    EffectsModule.forFeature([DestinationsEffects]),
    FlexLayoutModule,
    DestinationsRoutingModule,
    MaterialModule,
  ],
  providers: [DestinationsFacade],
})
export class DestinationsModule {}
