import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showGroup'
})
export class ShowGroupPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value != null ? value.groups.map(g => g.title).join(", ") : "chưa có!";
  }

}
