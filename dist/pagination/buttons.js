import settings from 'settings';
import { renderPages, calcConditions } from './pages.js';
import createButton from 'create-button';
const pagination = document.querySelector('[data-pagination="wrapper"]');
pagination.addEventListener('pageupdated', (event) => {
    const { nextBtn, previousBtn } = event.detail;
    const { totalPages } = calcConditions({ maxPerPage: settings.maxPerPage });
    previousBtn.style.display = settings.currPage <= 1 ? 'none' : 'block';
    nextBtn.style.display = settings.currPage > totalPages - 1 ? 'none' : 'block';
});
function createVirtualButtons() {
    const nextBtn = createButton('next');
    const previousBtn = createButton('previous');
    const pageUpdated = new CustomEvent('pageupdated', {
        detail: { nextBtn, previousBtn }
    });
    pagination.addEventListener('click', (event) => {
        const target = event.target;
        const isDataPage = target.matches('[data-page]') ? target : target.closest('[data-page]');
        if (!isDataPage) {
            return;
        }
        const page = Number.parseInt(target.dataset.page);
        settings.currPage = page;
        renderPages(page);
        pagination.dispatchEvent(pageUpdated);
    });
    pagination.addEventListener('click', (event) => {
        const targetClicked = event.target;
        const closestBtn = targetClicked.matches('button') ? targetClicked : targetClicked.closest('button');
        if (!closestBtn) {
            return;
        }
        const clickedOnNextBtn = closestBtn.isEqualNode(nextBtn);
        renderPages(clickedOnNextBtn ? ++settings.currPage : --settings.currPage);
        pagination.dispatchEvent(pageUpdated);
    });
    pagination.dispatchEvent(pageUpdated);
    return { previousBtn, nextBtn };
}
function renderButtons() {
    const { previousBtn, nextBtn } = createVirtualButtons();
    return (() => {
        const nodes = [nextBtn, previousBtn];
        const existedNodes = nodes.filter(node => pagination.contains(node));
        if (existedNodes.length === nodes.length) {
            return;
        }
        nodes.forEach((node) => {
            pagination.insertAdjacentElement(node.classList.contains('next') ? 'beforeend' : 'afterbegin', node);
        });
    })();
}
export default renderButtons;
