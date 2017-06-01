import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roundK'
})
export class RoundKPipe implements PipeTransform {
    transform(input: string, args: any[]): any {
        if (!input) {
            return '';
        }
      let addK = '';
      if (+input > 9999) {
        input = (+input / 1000).toFixed(1)
        addK = 'K';
      }
      input = input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      input = input.substr(0, input.length - 2);
      return input + addK;
    }
}
