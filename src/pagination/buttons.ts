import settings from 'settings';
import { renderPages, calcConditions } from './pages.js';
import createButton from 'create-button';

interface Buttons {
    nextBtn: HTMLButtonElement;
    previousBtn: HTMLButtonElement;
}

const pagination = document.querySelector('[data-pagination="wrapper"]') as HTMLDivElement;

pagination.addEventListener('pageupdated', (event: Event) => {

    const { nextBtn, previousBtn } = (event as CustomEvent).detail;
    const { totalPages } = calcConditions();

    previousBtn.style.display = settings.currPage <= 1 ? 'none' : 'block';
    nextBtn.style.display = settings.currPage > totalPages - 1 ? 'none' : 'block';
});

function createVirtualButtons(): Buttons {

    const nextBtn: HTMLButtonElement = createButton('next');
    const previousBtn: HTMLButtonElement = createButton('previous');

    const pageUpdated: CustomEvent<unknown> = new CustomEvent('pageupdated', {
        detail: { nextBtn, previousBtn }
    });

    pagination.addEventListener('click', (event: Event) => {

        const target = event.target as HTMLElement;
        const isDataPage = target.matches('[data-page]') ? target : target.closest('[data-page]');

        if(!isDataPage) {
            return;
        }

        const page = Number.parseInt(target.dataset.page as string);
        settings.currPage = page;

        renderPages(page);
        pagination.dispatchEvent(pageUpdated)
    });

    pagination.addEventListener('click', (event: Event): void => {

        const targetClicked = event.target as Element;
        const closestBtn = targetClicked.matches('button') ? targetClicked : targetClicked.closest('button');

        if(!closestBtn) {
            return;
        }

        const clickedOnNextBtn = closestBtn.isEqualNode(nextBtn);
        renderPages(clickedOnNextBtn ? ++settings.currPage : --settings.currPage);

        pagination.dispatchEvent(pageUpdated);
    });

    pagination.dispatchEvent(pageUpdated);

    return { previousBtn, nextBtn  } as Buttons;
}

function renderButtons(): void {

    const { previousBtn, nextBtn  }: Buttons = createVirtualButtons();

    return (() => {

        const nodes: HTMLButtonElement[] = [nextBtn, previousBtn];
        const existedNodes: HTMLButtonElement[] = nodes.filter(node => pagination.contains(node));

        if(existedNodes.length === nodes.length) {
            return;
        }

        nodes.forEach((node: HTMLButtonElement): void => {
            pagination.insertAdjacentElement(node.classList.contains('next') ? 'beforeend' : 'afterbegin', node);
        });

    })();
}

export default renderButtons;