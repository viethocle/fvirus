import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inprogress'
})
export class InprogressPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.filter(order => order.status === "inprogress");
  }

}
