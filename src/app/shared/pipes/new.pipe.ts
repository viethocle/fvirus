import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'new',
  pure: false
})
export class NewPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.filter(order => order.status === 'new');
  }

}
