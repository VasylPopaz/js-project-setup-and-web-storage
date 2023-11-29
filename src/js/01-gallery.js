// Add imports above this line
import { galleryItems } from './gallery-items';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line
const list = document.querySelector('.gallery');
const markup = galleryItems
  .map(
    item => `<li class="gallery__item">
   <a class="gallery__link" href=${item.original}>
      <img class="gallery__image" src=${item.preview} alt=${item.description}/>
   </a>
</li>`
  )
  .join('');
list.insertAdjacentHTML('afterbegin', markup);
list.style.listStyleType = 'none';
new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
