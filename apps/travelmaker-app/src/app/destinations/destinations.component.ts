import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { DayOfTheWeek, DestinationsEntity } from './+state/destinations.models';
import { DestinationsFacade } from './+state/destinations.facade';
import { LoadingService } from '../shared/services/loading.service';
import { DaysOfTheWeekSheetComponent } from './components/days-of-the-week-sheet/days-of-the-week-sheet.component';
import { AddDestinationDialogComponent } from './components/add-destination-dialog/add-destination-dialog.component';
import { EditDestinationDialogComponent } from './components/edit-destination-dialog/edit-destination-dialog.component';


@Component({
  selector: 'travelmaker-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
})
export class DestinationsComponent implements OnInit {
  public allDestinations$: Observable<DestinationsEntity[]>;
  public selectedDay$: Observable<DayOfTheWeek>;
  public allDestinationLoaded$: Observable<boolean>;
  public isLoading$: Subject<boolean>;

  constructor(
    private facade: DestinationsFacade,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private loadingService: LoadingService,
  ) {
    this.selectedDay$ = facade.selectedWeekday$;
    this.allDestinations$ = facade.allDestinations$;
    this.allDestinationLoaded$ = facade.loaded$;
    this.isLoading$ = loadingService.isLoading$;
  }

  ngOnInit(): void {
    this.facade.loadDestinations();
  }

  public onDayOfTheWeekClick(): void {
    this.bottomSheet.open(DaysOfTheWeekSheetComponent, { restoreFocus: false });
  }

  public onAddDestinationClick(): void {
    this.dialog.open(AddDestinationDialogComponent, {
      panelClass: ['dialog-fullscreen'],
      autoFocus: false,
    });
  }

  public onDestinationClick(destination: DestinationsEntity): void {
    this.dialog.open(EditDestinationDialogComponent, {
      panelClass: ['dialog-fullscreen'],
      data: { destination },
      autoFocus: false,
    });
  }

  public onDrop(destinations: DestinationsEntity[], event: CdkDragDrop<DestinationsEntity[]>) {
    moveItemInArray(destinations, event.previousIndex, event.currentIndex);
    this.facade.changeOrder(destinations.map(item => item.id));
  }

}
