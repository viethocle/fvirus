import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'truncateDescription'
})
export class TruncateDescriptionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return _.truncate(value, { 'length': 24 });
  }

}
