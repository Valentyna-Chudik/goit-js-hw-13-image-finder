import animateScrollTo from 'animated-scroll-to';

import NewsApiService from './apiService.js';
import LoadMoreBtn from './load-more-btn.js';
import notification from './notice-error.js';
import modal from './open-modal.js'
import getRefs from './get-refs.js';
import markup from './render-markup.js'

const refs = getRefs();

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImgs);
refs.imgsContainer.addEventListener('click', modal);

function onSearch(evt) {
    evt.preventDefault();
   
    newsApiService.query = evt.currentTarget.elements.query.value;

    if (newsApiService.query === '') {
        return notification.noticeNoQuery();
    }

    loadMoreBtn.show();
    newsApiService.resetPage();
    markup.clearImgsContainer(); 
    fetchImgs();
};

function fetchImgs() {
    loadMoreBtn.disable();
    newsApiService.fetchImgs().then(hits => {
        markup.renderImgsMarkup(hits);
        loadMoreBtn.enable();
        scrollTo();

        if (hits.length === 0) {
            loadMoreBtn.hide();
            return notification.errorNoResults();
        }
    });
};

// Scroll

function scrollTo() {
  const scrollToIndex = 12 * (newsApiService.page - 1) - 11;
  const scrollToElement = refs.imgsContainer.children[scrollToIndex];
  const options = {
    speed: 1500,
    verticalOffset: -15,
  };

  animateScrollTo(scrollToElement, options);
};

// // ScrollToBottom
// function scrollTo() {
//    window.scrollTo({
//   top: document.body.scrollHeight,
//   left: 0,
//   behavior: 'smooth'
// });
// }

