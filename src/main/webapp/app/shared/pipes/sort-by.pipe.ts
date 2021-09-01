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
      const aValue = a[field];
      const bValue = b[field];
      if (aValue === bValue) { return 0; }
      else if (!aValue) { return 1; }
      else if (!bValue) { return -1; }
      else { return bValue < aValue ? 1 : -1; }
    });

    return array;
  }
}
