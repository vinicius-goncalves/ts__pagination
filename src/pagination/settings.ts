interface PaginationSettings<T> {
    currPage: number;
    maxPerPage: number;
    content: T[];
}

const items = Array.from({ length: 100 }, (_, index) => index);

const settings: PaginationSettings<number> = {
    currPage: 1,
    maxPerPage: 5,
    content: items
};

export default settings;