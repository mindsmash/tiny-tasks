export enum TaskSortType {
    NONE = '',
    DUE_DATE = 'DUE_DATE',
    NAME = 'NAME',
}

export enum SortDirection {
    ASC = 'asc',
    DESC = 'desc',
}

export interface ISort {
    sortBy: { value: string | null, label: string };
    sortDir?: SortDirection
}