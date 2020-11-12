import imgsTpl from '../templates/image-card.hbs';

import getRefs from './get-refs.js';

const refs = getRefs();

function renderImgsMarkup(hits) {
     refs.imgsContainer.insertAdjacentHTML('beforeend', imgsTpl(hits));
};

function clearImgsContainer() {
    refs.imgsContainer.innerHTML = '';
};

export default { renderImgsMarkup, clearImgsContainer };