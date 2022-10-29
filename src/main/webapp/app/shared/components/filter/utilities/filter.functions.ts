import { Utils } from "../../../functions/utils";

const buildFilterString: (filter: Record<string, any> | null) => string = (
    filter: Record<string, any> | null
): string => {
    return Object.entries(filter || {})
        .reduce((total, [prop, val]) => {
            let tempString: string = `${total}`;
            if (!Utils.isNullOrUndefined(val) && val !== '') {
                tempString = `${total}&${prop}=${val}`;
            }
            return tempString;
        }, '').slice(1) || '';
};

const buildFilterObj: (filter: string) => Record<string, any> = (
    filter: string
): Record<string, any> => {
    return (filter || '').split('&').reduce((total, next) => {
        if (!next) { return { ...total }; }
        const keyVal: string[] = next.split('=');
        return { ...total, [keyVal[0]]: keyVal[1] }
    }, {});
};

export const FilterUtilities: {
    buildFilterString: (typeof buildFilterString);
    buildFilterObj: (typeof buildFilterObj);
} = {
    buildFilterString,
    buildFilterObj,
};
