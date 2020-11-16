import { notice, error } from '@pnotify/core';

function noticeNoQuery() {
  notice({
    text: 'Please, enter your query.',
    delay: 1000,
  });
}

function errorNoResults() {
  error({
    text: 'No results found. Please try another search.',
    delay: 1000,
  });
}

export default { noticeNoQuery, errorNoResults };
