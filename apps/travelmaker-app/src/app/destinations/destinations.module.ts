import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DestinationsRoutingModule } from './destinations-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import * as fromDestinations from './+state/destinations.reducer';
import { DestinationsEffects } from './+state/destinations.effects';
import { DestinationsFacade } from './+state/destinations.facade';
import { DestinationsComponent } from './destinations.component';
import { DestinationAddFormComponent, DestinationEditFormComponent } from './components/destination-form/destination-form.component';
import { DaysOfTheWeekSheetComponent } from './components/days-of-the-week-sheet/days-of-the-week-sheet.component';
import { TranslateWeekdayPipe } from '../shared/pipes/translate-weekday.pipe';


@NgModule({
  declarations: [
    DestinationsComponent,
    DestinationAddFormComponent,
    DestinationEditFormComponent,
    DaysOfTheWeekSheetComponent,
    TranslateWeekdayPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
