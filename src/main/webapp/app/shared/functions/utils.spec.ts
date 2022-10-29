import { Utils } from "./utils";

describe('Utils', () => {
    describe('on isObjectEmpty', () => {
        it(`should return 'true' on 'null'`, () => {
            expect(Utils.isObjectEmpty(null)).toEqual(true);
        });

        it(`should return 'true' on 'undefined'`, () => {
            expect(Utils.isObjectEmpty(undefined)).toEqual(true);
        });

        it(`should return 'true' on '{}'`, () => {
            expect(Utils.isObjectEmpty({})).toEqual(true);
        });

        it(`should return 'false' on '{ prop: 'value' }'`, () => {
            expect(Utils.isObjectEmpty({ prop: 'value' })).toEqual(false);
        });
    });

    describe('on isNullOrUndefined', () => {
        it(`should return 'true' on 'null'`, () => {
            expect(Utils.isNullOrUndefined(null)).toEqual(true);
        });

        it(`should return 'true' on 'undefined'`, () => {
            expect(Utils.isNullOrUndefined(undefined)).toEqual(true);
        });

        it(`should return 'false' on '{}'`, () => {
            expect(Utils.isNullOrUndefined({})).toEqual(false);
        });

        it(`should return 'false' on '{ prop: 'value' }'`, () => {
            expect(Utils.isNullOrUndefined({ prop: 'value' })).toEqual(false);
        });

        it(`should return 'false' on 'boolean'`, () => {
            expect(Utils.isNullOrUndefined(false)).toEqual(false);
        });

        it(`should return 'false' on 'string'`, () => {
            expect(Utils.isNullOrUndefined('')).toEqual(false);
        });

        it(`should return 'false' on 'number'`, () => {
            expect(Utils.isNullOrUndefined(3)).toEqual(false);
        });
    });
});
