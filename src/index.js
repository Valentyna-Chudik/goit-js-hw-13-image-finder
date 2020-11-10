import './styles.css';

// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';

// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';

import imgsTpl from './templates/image-card.hbs';

import NewsApiService from './js/apiService.js';
// import errorNotification from './js/notice-error.js';
// import LoadMoreBtn from './js/load-more-btn.js';

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    imgsContainer: document.querySelector('.js-gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const newsApiService = new NewsApiService();
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(evt) {
    evt.preventDefault();

    newsApiService.query = evt.currentTarget.elements.query.value;
    newsApiService.resetPage();
    newsApiService.fetchImgs().then(renderImgsMarkup); 
};

function onLoadMore() {
    newsApiService.fetchImgs().then(renderImgsMarkup); ; 
};

function renderImgsMarkup(hits) {
    const markup = imgsTpl(hits);
    refs.imgsContainer.innerHTML = markup;
};
