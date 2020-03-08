import { Pipe, PipeTransform } from '@angular/core';

import { sortByKeys } from './sort-by-key';

/**
 * Pipe for the sorting function.
 */
@Pipe({
    name: 'sortByKeys',
    pure: false
})
export class SortByKeysPipe implements PipeTransform {
    public transform(value: any[], ...keys: string[]): any[] {
        return sortByKeys<any>(value.slice(), ...keys);
    }
}