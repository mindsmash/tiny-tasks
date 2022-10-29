import { ISort } from "../models/sort.model";

const buildSortString: (sort: ISort | null) => string = (sort: ISort | null): string => {
    let sortString: string = '';
    sortString += sort?.sortBy?.value ? `sortBy=${sort.sortBy.value}` : '';
    sortString += sort?.sortBy?.value && sort.sortDir ? `&sortDir=${sort.sortDir}` : '';
    return sortString;
};

export const SortUtils: {
    buildSortString: (typeof buildSortString);
} = {
    buildSortString,
};