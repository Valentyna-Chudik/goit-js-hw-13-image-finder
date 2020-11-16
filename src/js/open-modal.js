// Modal Window Opening
import * as basicLightbox from 'basiclightbox';

export default function onOpenModal(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const largeImage = `<img src= ${evt.target.dataset.source}>`;
  basicLightbox.create(largeImage).show();
}
