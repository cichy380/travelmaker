import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { GoogleMapModule } from '../google-map/google-map.module';
import { DestinationsRoutingModule } from './destinations-routing.module';
import * as fromDestinations from './+state/destinations.reducer';
import { DestinationsEffects } from './+state/destinations.effects';
import { DestinationsFacade } from './+state/destinations.facade';
import { DestinationsComponent } from './destinations.component';
import { DestinationFormComponent } from './components/destination-form/destination-form.component';
import { DaysOfTheWeekSheetComponent } from './components/days-of-the-week-sheet/days-of-the-week-sheet.component';
import { DestinationListComponent } from './components/destination-list/destination-list.component';
import { DestinationListItemComponent } from './components/destination-list/destination-list-item/destination-list-item.component';
import { DestinationsByDayPipe } from './pipes/destinations-by-day.pipe';
import { MapDirectionsUrlPipe } from './pipes/map-directions-url.pipe';
import { EditDestinationDialogComponent } from './components/edit-destination-dialog/edit-destination-dialog.component';
import { AddDestinationDialogComponent } from './components/add-destination-dialog/add-destination-dialog.component';


@NgModule({
  declarations: [
    DestinationsComponent,
    DestinationFormComponent,
    DaysOfTheWeekSheetComponent,
    DestinationListComponent,
    DestinationListItemComponent,
    DestinationsByDayPipe,
    MapDirectionsUrlPipe,
    EditDestinationDialogComponent,
    AddDestinationDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromDestinations.DESTINATIONS_FEATURE_KEY, fromDestinations.reducer),
    EffectsModule.forFeature([DestinationsEffects]),
    DestinationsRoutingModule,
    SharedModule,
    GoogleMapModule,
  ],
  providers: [DestinationsFacade],
})
export class DestinationsModule {}
