import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DestinationsRoutingModule } from './destinations-routing.module';
import * as fromDestinations from './+state/destinations.reducer';
import { DestinationsEffects } from './+state/destinations.effects';
import { DestinationsFacade } from './+state/destinations.facade';
import { DestinationsComponent } from './destinations.component';
import {
  DestinationAddFormComponent,
  DestinationEditFormComponent,
} from './components/destination-form/destination-form.component';
import { DaysOfTheWeekSheetComponent } from './components/days-of-the-week-sheet/days-of-the-week-sheet.component';
import { DestinationsByDayPipe } from './pipes/destinations-by-day.pipe';
import { SharedModule } from '../shared/shared.module';
import { DestinationListItemComponent } from './components/destination-list/destination-list-item/destination-list-item.component';
import { DestinationListComponent } from './components/destination-list/destination-list.component';


@NgModule({
  declarations: [
    DestinationsComponent,
    DestinationAddFormComponent,
    DestinationEditFormComponent,
    DaysOfTheWeekSheetComponent,
    DestinationsByDayPipe,
    DestinationListComponent,
    DestinationListItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromDestinations.DESTINATIONS_FEATURE_KEY, fromDestinations.reducer),
    EffectsModule.forFeature([DestinationsEffects]),
    DestinationsRoutingModule,
    SharedModule,
  ],
  providers: [DestinationsFacade],
})
export class DestinationsModule {}
