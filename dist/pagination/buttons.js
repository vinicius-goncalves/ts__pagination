import settings from 'settings';
import { renderPages, calcConditions } from './pages.js';
import createButton from 'create-button';
const pagination = document.querySelector('[data-pagination="wrapper"]');
pagination.addEventListener('pageupdated', (event) => {
    const { nextBtn, previousBtn } = event.detail;
    const { totalPages } = calcConditions({ maxPerPage: settings.maxPerPage });
    if (settings.currPage <= 1) {
        previousBtn.style.display = 'none';
    }
    else {
        previousBtn.style.display = 'block';
    }
    if (settings.currPage > totalPages - 1) {
        nextBtn.style.display = 'none';
    }
    else {
        nextBtn.style.display = 'block';
    }
});
function createVirtualButtons() {
    const nextBtn = createButton('next');
    const previousBtn = createButton('previous');
    const pageUpdated = new CustomEvent('pageupdated', {
        detail: { nextBtn, previousBtn }
    });
    pagination.dispatchEvent(pageUpdated);
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
    return { nextBtn, previousBtn };
}
function renderButtons() {
    const { nextBtn, previousBtn } = createVirtualButtons();
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
