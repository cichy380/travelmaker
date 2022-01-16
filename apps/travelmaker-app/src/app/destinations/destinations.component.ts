import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Observable, Subscription } from 'rxjs';
import { DaysOfTheWeekSheetComponent } from './components/days-of-the-week-sheet/days-of-the-week-sheet.component';
import { DestinationsEntity } from './+state/destinations.models';
import { DestinationsFacade } from './+state/destinations.facade';


@Component({
  selector: 'travelmaker-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
})
export class DestinationsComponent implements OnInit, OnDestroy {
  public destinations$: Observable<DestinationsEntity[]> | undefined;
  private subscription = new Subscription();

  constructor(public facade: DestinationsFacade, private _bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.facade.loadDestinations();
    this.subscription = this.facade.selectedWeekday$.subscribe(selectedWeekday =>
      this.destinations$ = this.facade.getDestinationsByDay(selectedWeekday),
    );
  }

  onDayOfTheWeekClick(): void {
    this._bottomSheet.open(DaysOfTheWeekSheetComponent, {restoreFocus: false});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
