import { openModal, keyPressEsc, handleClickClose, closeModal } from './modal.js';
export {initialCards, createCard, removeCard, addCard, showImage, like, cardTemplate, placesList};

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');

// Функция создания карточки
function createCard (cardTitle, cardImage, deleteCard, showImg, likeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardPicture = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').alt = cardTitle;
  cardElement.querySelector('.card__image').src = cardImage;

  cardDeleteButton.addEventListener('click', deleteCard);
  cardPicture.addEventListener("click", () => showImg(cardTitle, cardImage));
  cardElement.addEventListener('click', likeCard);

  return cardElement;
}

// Функция удаления карточки
function removeCard (evt) {
  const item = evt.target.closest('.card');
  item.remove();
}

// Вывести карточки на страницу
function addCard(card) {
  placesList.append(card);
}

//Функция обработчика клика по картинке
function showImage(cardTitle, cardImage){
  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');
  popupCaption.textContent = cardTitle;
  popupImage.alt = cardTitle;
  popupImage.src = cardImage;
  openModal(popupTypeImage);
  document.addEventListener('keydown', keyPressEsc);
  popupTypeImage.addEventListener('click', handleClickClose);
}

//Функция лайка по карточке
function like(evt) {
    if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
    }
}



