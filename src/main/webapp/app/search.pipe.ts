import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  normalize(word) {
    return typeof word === 'string' ? word.toLowerCase() : word;
  }

  transform(value: any, args?: any): any {
    if(!args) {
      return value;
    }
    let self = this;
    return value.filter(x => self.normalize(x.name).indexOf(self.normalize(args)) > -1);
  }

}
