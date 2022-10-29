
const buildQueryParamString: (...params: string[]) => string = (...params: string[]): string => {
    return params.reduce((total, next) => (total + (next ? `${next}&` : '')), '').slice(0, -1);
};

export const QueryParamsUtils: {
    buildQueryParamString: (typeof buildQueryParamString);
} = {
    buildQueryParamString
};
