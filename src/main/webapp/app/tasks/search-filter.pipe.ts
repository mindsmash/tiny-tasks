import { Pipe, PipeTransform } from '@angular/core';
import {Task} from "./task";
@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(
    value: Task[] | null,
    search: string
  ): Task[] | null {
    if (value) {
      const regexp = new RegExp(search, 'i');
      const properties = Object.keys(value[0]);
      return [
        ...value.filter((item) => {
          // @ts-ignore
          return properties.some((property) => regexp.test(item[property]));
        }),
      ];
    } else {
      return [];
    }
  }
}
