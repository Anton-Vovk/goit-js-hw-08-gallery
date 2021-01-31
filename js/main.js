import gallery from './gallery-items.js';

const galleryPicRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxElementRef = document.querySelector('.lightbox__image');
const closeModalBtnRef = document.querySelector('.lightbox__button');
const overlayModal = document.querySelector('.lightbox__overlay');

// Добавляю разметку в HTML

const galleryMarkup = galleryCreate();
galleryPicRef.insertAdjacentHTML('beforeend', galleryMarkup);

function galleryCreate() {
  let i = 0;
  const markup = gallery
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index ="${(i += 1)}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');

  return markup;
}
//z-index для будущего пролистывание изображений галереи 

//Ссылка на большое изображения

galleryPicRef.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
}

//Открытия модалки, замена значений alt, src

galleryPicRef.addEventListener('click', onOpenModal);

function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  lightboxRef.classList.add('is-open');
  lightboxElementRef.src = event.target.dataset.source;
  lightboxElementRef.alt = event.target.alt;
  lightboxElementRef.dataset.index = event.target.dataset.index;

  document.addEventListener('keydown', onCloseModalByEsc);
}

closeModalBtnRef.addEventListener('click', onCloseModal);

//Закрытия модалки 

function onCloseModal() {
  lightboxRef.classList.remove('is-open');
  document.removeEventListener('keydown', onCloseModalByEsc);
  lightboxElementRef.src = '';
}

function onCloseModalByEsc(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

overlayModal.addEventListener('click', closeModalByOverlay);

function closeModalByOverlay(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

