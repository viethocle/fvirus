import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateHumanize'
})
export class DateHumanizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment(value).locale("vi").fromNow();
  }

}
