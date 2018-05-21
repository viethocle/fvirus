import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateTimeVi'
})
export class DateTimeViPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment(value).locale('vi').format('ll');
  }

}
