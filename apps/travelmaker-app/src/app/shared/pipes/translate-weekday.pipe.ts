import { Pipe, PipeTransform } from '@angular/core';
import { DayOfTheWeek } from '../../destinations/+state/destinations.models';


@Pipe({
  name: 'translateWeekday',
})
export class TranslateWeekdayPipe implements PipeTransform {

  transform(dayToTranslate: DayOfTheWeek | unknown, locale: string = navigator.language): string | unknown {
    if (!dayToTranslate) {
      return dayToTranslate;
    }

    const searchedDayDate = new Date();
    const searchedDayWeekdayIndex = Object.values(DayOfTheWeek).findIndex(item => item === dayToTranslate);

    searchedDayDate.setDate(searchedDayDate.getDate() - ((searchedDayDate.getDay() - searchedDayWeekdayIndex) % 7));

    return searchedDayDate.toLocaleString(locale, {weekday: 'long'});
  }

}
