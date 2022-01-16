import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { getWeekStartByLocale } from 'weekstart';
import { DayOfTheWeek } from '../../+state/destinations.models';
import { DestinationsFacade } from '../../+state/destinations.facade';

@Component({
  selector: 'travelmaker-days-of-the-week-sheet',
  templateUrl: './days-of-the-week-sheet.component.html',
  styleUrls: ['./days-of-the-week-sheet.component.scss']
})
export class DaysOfTheWeekSheetComponent {
  public days: DayOfTheWeek[];

  constructor(private _bottomSheetRef: MatBottomSheetRef<DaysOfTheWeekSheetComponent>, private facade: DestinationsFacade) {
    const weekdays = Object.values(DayOfTheWeek);
    const indexFirstDayOfTheWeek = getWeekStartByLocale(navigator.language);
    this.days = weekdays.concat(weekdays).slice(indexFirstDayOfTheWeek, indexFirstDayOfTheWeek + 7);
  }

  onDayClick(event: UIEvent, clickedDay: DayOfTheWeek): void {
    this._bottomSheetRef.dismiss();
    this.facade.setSelectedWeekday(clickedDay);
    event.preventDefault();
  }

}
