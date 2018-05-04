import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseContentOrder'
})
export class ParseContentOrderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return JSON.parse(value) ? JSON.parse(value)[0].content + " ..." : "Nội dung lỗi!";
  }
}
