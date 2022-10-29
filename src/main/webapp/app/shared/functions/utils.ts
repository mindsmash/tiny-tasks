
export const isNullOrUndefined: (val: any) => boolean = (
    value: any
): boolean => (value === null || value === undefined);

export const isObjectEmpty: (value: Record<any, any> | null | undefined) => boolean = (
    value: Record<any, any> | null | undefined
): boolean => (!Object.keys(value || {}).length);

export const Utils: {
    isNullOrUndefined: (typeof isNullOrUndefined);
    isObjectEmpty: (typeof isObjectEmpty);
} = {
    isNullOrUndefined,
    isObjectEmpty,
};
