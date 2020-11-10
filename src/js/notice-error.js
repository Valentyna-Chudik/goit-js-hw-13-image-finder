import { error } from '@pnotify/core';

function noticeNoResults() {
  error({
    title: '404',
    text: 'No results found. Please try another search.',
    delay: 1000,
  });
}

export default { noticeNoResults };