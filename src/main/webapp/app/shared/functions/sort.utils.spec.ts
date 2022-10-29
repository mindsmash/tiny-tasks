import { ISort, SortDirection } from "../models/sort.model";
import { SortUtils } from "./sort.utils";

describe('SortUtils', () => {
    describe('on buildSortString', () => {
        it(`should return '' on 'null'`, () => {
            expect(SortUtils.buildSortString(null)).toEqual('');
        });

        it(`should return 'sortBy=sortValue&sortDir=asc' on sort setted`, () => {
            const sort: ISort = { sortBy: { value: 'sortValue', label: 'sortLabel' }, sortDir: SortDirection.ASC }
            expect(SortUtils.buildSortString(sort)).toEqual('sortBy=sortValue&sortDir=asc');
        });

        it(`should return 'sortBy=sortValue' on sort partially setted`, () => {
            const sort: ISort = { sortBy: { value: 'sortValue', label: 'sortLabel' } }
            expect(SortUtils.buildSortString(sort)).toEqual('sortBy=sortValue');
        });
    });
});
