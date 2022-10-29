import { QueryParamsUtils } from "./query-params.utils";

describe('QueryParamsUtils', () => {
    describe('on buildQueryParamString', () => {
        it(`should return 'param1' on 'param1'`, () => {
            expect(QueryParamsUtils.buildQueryParamString('param1')).toEqual('param1');
        });

        it(`should return 'param1&param2' on '(param1, param2)'`, () => {
            expect(QueryParamsUtils.buildQueryParamString('param1', 'param2')).toEqual('param1&param2');
        });

        it(`should return 'param1&param2' on '(param1, param2, '')'`, () => {
            expect(QueryParamsUtils.buildQueryParamString('param1', 'param2', '')).toEqual('param1&param2');
        });
    });
});
