import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseContentOrder'
})
export class ParseContentOrderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return JSON.parse(value) ? JSON.parse(value).map(e => e.content).join("\n") : "Nội dung lỗi!";
  }
}
