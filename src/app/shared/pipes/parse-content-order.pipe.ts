import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'parseContentOrder'
})
export class ParseContentOrderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (_.isString(value)) {
      value = JSON.parse(value);
    }
    return value.map(e => e.content).join(", ");
  }
}
