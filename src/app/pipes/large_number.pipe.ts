import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'largeNumber'
})
export class LargeNumberPipe implements PipeTransform {
    transform(input: string, args: any[]): any {
        if (!input) {
            return '';
        }
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}
