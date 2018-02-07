import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ready'
})
export class ReadyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.filter(order => order.status === "ready");
  }

}
