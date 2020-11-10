import './styles.css';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import imgsTpl from './templates/image-card.hbs';

import NewsApiService from './js/apiService.js';
import LoadMoreBtn from './js/load-more-btn.js';
// import errorNotification from './js/notice-error.js';


const refs = {
    searchForm: document.querySelector('.js-search-form'),
    imgsContainer: document.querySelector('.js-gallery'),
    // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImgs);

function onSearch(evt) {
    evt.preventDefault();
   
    newsApiService.query = evt.currentTarget.elements.query.value;

    // if (newsApiService.query === '') {
    //     return alert("Enter your query");
    // }
    loadMoreBtn.show();
    newsApiService.resetPage();
    clearImgsContainer(); 
    fetchImgs();
};

function fetchImgs() {
    loadMoreBtn.disable();
    newsApiService.fetchImgs().then(hits => {
        renderImgsMarkup(hits);
        loadMoreBtn.enable();
    });
};

function renderImgsMarkup(hits) {
     refs.imgsContainer.insertAdjacentHTML('beforeend', imgsTpl(hits));
};

function clearImgsContainer() {
    refs.imgsContainer.innerHTML = '';
};
