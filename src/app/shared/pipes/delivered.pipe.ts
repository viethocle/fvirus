import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'delivered',
  pure: false
})
export class ClosedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.filter(order => order.status === "delivered");
  }

}
