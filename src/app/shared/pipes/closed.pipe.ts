import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'closed'
})
export class ClosedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.filter(order => order.status === "closed");
  }

}
