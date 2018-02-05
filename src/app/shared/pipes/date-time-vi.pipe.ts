import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from "@angular/common";


@Pipe({
  name: 'dateTimeVi'
})
export class DateTimeViPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {

  }

  transform(value: any, args?: any): any {
    return this.datePipe.transform(value, "dd-MM-yyyy");
  }

}
