const items = Array.from({ length: 100 }, (_, index) => index);
const settings = {
    currPage: 1,
    maxPerPage: 5,
    content: items
};
export default settings;
