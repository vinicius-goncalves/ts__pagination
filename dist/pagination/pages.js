import settings from 'settings';
import buildElement from 'element-builder';
import { clearTree } from 'utils';
const pagination = document.querySelector('[data-pagination="wrapper"]');
const pages = document.querySelector('[data-pagination="pages"]');
function calcConditions({ maxPerPage }) {
    const totalPages = Math.ceil(settings.content.length / maxPerPage);
    const lowestPageOffset = Math.min(5, totalPages);
    return { totalPages, lowestPageOffset };
}
function definePagesRange() {
    const { maxPerPage } = settings;
    const { totalPages, lowestPageOffset } = calcConditions({ maxPerPage });
    if (typeof settings.currPage === 'undefined') {
        return { startPage: 1, lastPage: lowestPageOffset };
    }
    const areFirstPages = settings.currPage >= 1 && settings.currPage <= lowestPageOffset;
    const areMiddlePages = settings.currPage >= lowestPageOffset && settings.currPage <= totalPages - lowestPageOffset;
    const areLatestPages = settings.currPage > totalPages - lowestPageOffset && settings.currPage <= totalPages;
    if (areFirstPages) {
        return { startPage: 1, lastPage: lowestPageOffset };
    }
    if (areMiddlePages) {
        const currPaginationGroup = Math.ceil(settings.currPage / lowestPageOffset);
        const pageOffset = ((currPaginationGroup - 1) * lowestPageOffset) + 1;
        return { startPage: pageOffset, lastPage: pageOffset + (lowestPageOffset - 1) };
    }
    if (areLatestPages) {
        return { startPage: totalPages - lowestPageOffset, lastPage: totalPages };
    }
    return { startPage: 1, lastPage: lowestPageOffset };
}
async function renderPages(currPage = 1) {
    clearTree(pages).then(() => {
        const { startPage, lastPage } = definePagesRange();
        for (let pageIndex = startPage; pageIndex <= lastPage; pageIndex++) {
            buildElement('span')
                .addClasses('page')
                .addClassesIf({ clazz: 'active', condition: currPage === pageIndex })
                .addCustomAttribute('data-page', String(pageIndex))
                .appendOn(pages)
                .setText(pageIndex)
                .build();
        }
    });
}
export { calcConditions, renderPages };
