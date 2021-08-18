import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(array: any[], field?: string): any[] {
    if (!array || !field) {
      return array;
    }

    array.sort((a: any, b: any) => {
      let A = a[field];
      let B = b[field];

      if (A === B) {
        return 0;
      } else if (A === null) {
        return 1;
      } else if (B === null) {
        return -1;
      } else {
        return A < B ? 1 : -1;
      }
    });

    return array;
  }
}
