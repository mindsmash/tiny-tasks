import { FilterUtilities } from "./filter.functions";

describe('FilterUtilities', () => {
    describe('on buildFilterObj', () => {
        it(`should return '{}' on ''`, () => {
            expect(FilterUtilities.buildFilterObj('')).toEqual({});
        });

        it(`should return '{}' on 'null'`, () => {
            expect(FilterUtilities.buildFilterObj(null as any)).toEqual({});
        });

        it(`should return '{}' on 'undefined'`, () => {
            expect(FilterUtilities.buildFilterObj(undefined as any)).toEqual({});
        });

        it(`should return '{ prop: 'value' }' on 'prop=value'`, () => {
            expect(FilterUtilities.buildFilterObj('prop=value')).toEqual({ prop: 'value' });
        });

        it(`should return '{ prop1: 'value1', prop2: 'value2' }' on 'prop1=value1&prop2=value2'`, () => {
            expect(FilterUtilities.buildFilterObj('prop1=value1&prop2=value2')).toEqual({ prop1: 'value1', prop2: 'value2' });
        });
    });

    describe('on buildFilterObj', () => {
        it(`should return '' on 'null'`, () => {
            expect(FilterUtilities.buildFilterString(null as any)).toEqual('');
        });

        it(`should return '' on 'undefined'`, () => {
            expect(FilterUtilities.buildFilterString(undefined as any)).toEqual('');
        });

        it(`should return '' on '{ prop: '' }'`, () => {
            expect(FilterUtilities.buildFilterString({ prop: '' })).toEqual('');
        });

        it(`should return 'prop=value' on '{ prop: 'value' }'`, () => {
            expect(FilterUtilities.buildFilterString({ prop: 'value' })).toEqual('prop=value');
        });

        it(`should return 'prop1=value1&prop2=value2' on '{ prop1: 'value1', prop2: 'value2' }'`, () => {
            expect(FilterUtilities.buildFilterString({ prop1: 'value1', prop2: 'value2' })).toEqual('prop1=value1&prop2=value2');
        });
    });

});
