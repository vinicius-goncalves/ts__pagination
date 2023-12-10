import { renderPages } from './pagination/pages.js';
import renderButtons from './pagination/buttons.js';
export let currPage = 1;
window.addEventListener('DOMContentLoaded', () => {
    renderPages(currPage).then(renderButtons);
});
