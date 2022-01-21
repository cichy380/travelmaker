import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { DestinationsEntity } from './+state/destinations.models';
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
export class DestinationsComponent implements OnInit, OnDestroy {
  public destinations$: Observable<DestinationsEntity[]> | undefined;
  private subscription = new Subscription();

  constructor(
    public facade: DestinationsFacade,
    private bottomSheet: MatBottomSheet,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.facade.loadDestinations();
    this.subscription = this.facade.selectedWeekday$.subscribe(selectedWeekday =>
      this.destinations$ = this.facade.getDestinationsByDay(selectedWeekday)
    );
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
