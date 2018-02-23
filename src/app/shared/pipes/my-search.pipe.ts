import { Pipe, PipeTransform } from '@angular/core';
import { Ng2SearchPipe } from 'ng2-search-filter';
import * as _ from 'lodash';

@Pipe({
  name: 'mySearch'
})
export class MySearchPipe implements PipeTransform {

  maxElements = 30;

  constructor(
    private ng2search: Ng2SearchPipe
  ) {

  }

  transform(value: any, args?: any): any {
    return _.take(this.ng2search.transform(value, args), this.maxElements);
  }

}

