import settings from 'settings';
import { renderPages } from './pagination/pages.js';
import renderButtons from './pagination/buttons.js';

window.addEventListener('DOMContentLoaded', (): void => {
    renderPages(settings.currPage).then(renderButtons);
})