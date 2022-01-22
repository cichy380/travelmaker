import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DayOfTheWeek, DestinationsEntity } from './+state/destinations.models';
import { DestinationsFacade } from './+state/destinations.facade';
import { DaysOfTheWeekSheetComponent } from './components/days-of-the-week-sheet/days-of-the-week-sheet.component';
import {
  DestinationAddFormComponent,
  DestinationEditFormComponent,
} from './components/destination-form/destination-form.component';


@Component({
  selector: 'travelmaker-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit {
  public destinations$: Observable<DestinationsEntity[]>;
  public selectedDay$: Observable<DayOfTheWeek>;
  public loaded$: Observable<boolean>;

  constructor(
    private facade: DestinationsFacade,
    private bottomSheet: MatBottomSheet,
    public dialog: MatDialog
  ) {
    this.selectedDay$ = facade.selectedWeekday$;
    this.destinations$ = facade.allDestinations$;
    this.loaded$ = facade.loaded$;
  }

  ngOnInit(): void {
    this.facade.loadDestinations();
  }

  public onDayOfTheWeekClick(): void {
    this.bottomSheet.open(DaysOfTheWeekSheetComponent, { restoreFocus: false });
  }

  public onAddDestinationClick(): void {
    this.dialog.open(DestinationAddFormComponent, {
      panelClass: ['fullscreen-dialog'],
      autoFocus: false,
    });
  }

  public onEditDestinationClick(destination: DestinationsEntity): void {
    this.dialog.open(DestinationEditFormComponent, {
      panelClass: ['fullscreen-dialog'],
      data: { destination },
      autoFocus: false,
    });
  }

  public compareWith(destination1: DestinationsEntity | undefined, destination2: DestinationsEntity | undefined) {
    return !!destination1 && !!destination2 && destination1.id === destination2.id;
  }
}
