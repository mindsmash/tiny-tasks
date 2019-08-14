import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByPresence'
})
export class OrderByPresencePipe implements PipeTransform {

  transform(value: any[], property: string): any[] {
    if (!value) return [];
    if (value.length == 1) return value;
    return value.sort((v1, v2) => {
      if (v1[property] && !v2[property])
        return -1;
      if (!v1[property] && v2[property])
        return 1;
      return 0;
    });
  }

}
