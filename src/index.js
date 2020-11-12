import './styles.css';

import animateScrollTo from 'animated-scroll-to';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import imgsTpl from './templates/image-card.hbs';

import NewsApiService from './js/apiService.js';
import LoadMoreBtn from './js/load-more-btn.js';
import errorNotification from './js/notice-error.js';


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
refs.imgsContainer.addEventListener('click', onOpenModal);

function onSearch(evt) {
    evt.preventDefault();
   
    newsApiService.query = evt.currentTarget.elements.query.value;

    if (newsApiService.query === '') {
        return alert("Enter your query");
    };
    
    try {
       loadMoreBtn.show();
        newsApiService.resetPage();
        clearImgsContainer();
        fetchImgs();
       
   } catch (error) {
       errorNotification.noticeNoResults
   }
  
};

function fetchImgs() {
    loadMoreBtn.disable();
    newsApiService.fetchImgs().then(hits => {
        renderImgsMarkup(hits);
        loadMoreBtn.enable();
        onScrollTo();
    });
};

function renderImgsMarkup(hits) {
     refs.imgsContainer.insertAdjacentHTML('beforeend', imgsTpl(hits));
};

function clearImgsContainer() {
    refs.imgsContainer.innerHTML = '';
};

function onScrollTo() {
   const scrollToIndex = 12 * (newsApiService.page - 1) - 11;
  const scrollToElement = refs.imgsContainer.children[scrollToIndex];
  const options = {
    speed: 1500,
    verticalOffset: -15,
  };

  animateScrollTo(scrollToElement, options);
}


// // ScrollToBottom
// function scrollTo() {
//    window.scrollTo({
//   top: document.body.scrollHeight,
//   left: 0,
//   behavior: 'smooth'
// });
// }

// Modal Window Opening
function onOpenModal(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const largeImage = `<img src= ${evt.target.dataset.source}>`;
  basicLightbox.create(largeImage).show();
}