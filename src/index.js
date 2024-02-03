//Импорт стилей
import './pages/index.css';
//Импорт функциий создания, удаления и добавления карточки на страницу
import { createCard, removeCard, addCard, showImage, like, initialCards, cardTemplate, placesList } from './components/cards.js';
//Импорт функций открытия и закрытия модальных окон
import { openModal, keyPressEsc, handleClickClose, closeModal } from './components/modal.js';

// DOM узлы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');

const formElementProfile = popupEdit.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;

const formElementCard = popupAdd.querySelector('.popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

//Добавление карточек на страницу
initialCards.forEach (card => {
  const template = createCard(card.name, card.link, removeCard, showImage, like);
  addCard(template);
})

//Обработчики попапов
popupAddButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  openModal(popupAdd);
  document.addEventListener('keydown', keyPressEsc);
  popupAdd.addEventListener('click', handleClickClose);
});

popupEditButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  openModal(popupEdit);
  document.addEventListener('keydown', keyPressEsc);
  popupEdit.addEventListener('click', handleClickClose);
});

//Функция изменения профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closeModal(popupEdit);
}
//Обработчик функции изменения профиля
formElementProfile.addEventListener('submit', handleFormSubmit); 

//Функция добавления новой карточки через форму
function addNewCard(cardNameValue, cardLinkValue) {
  const cardElementNew = cardTemplate.querySelector('.card').cloneNode(true);
  cardElementNew.querySelector('.card__title').textContent = cardNameValue;
  cardElementNew.querySelector('.card__image').src = cardLinkValue;
  const newCard = createCard(cardNameValue, cardLinkValue, removeCard, showImage, like);
  placesList.prepend(newCard);
  closeModal(popupAdd);
  formElementCard.reset();
}
//Обработчик функции добавления новой карточки через форму
formElementCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
    addNewCard(cardNameInput.value, cardLinkInput.value)
})





