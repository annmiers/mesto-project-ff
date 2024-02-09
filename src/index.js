//Импорт стилей
import './pages/index.css';
//Импорт функциий создания, удаления и добавления карточки на страницу
import { createCard, removeCard, like, cardTemplate, cardsContainer } from './components/card.js';
//Импорт функций открытия и закрытия модальных окон
import { openModal, handleClickClose, closeModal } from './components/modal.js';
import { initialCards } from './components/cards.js';

// DOM узлы
const popupModals = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const formElementProfile = popupEdit.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const formElementCard = popupAdd.querySelector('.popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Вывести карточки на страницу
function addCard(card) {
  cardsContainer.append(card);
}

//Функция обработчика клика по картинке
function onImageClick(cardTitle, cardImage){
  popupCaption.textContent = cardTitle;
  popupImage.alt = cardTitle;
  popupImage.src = cardImage;
  openModal(popupTypeImage);
}

//Функция добавления новой карточки через форму
function handleCardAdd(cardNameValue, cardLinkValue) {
  const cardElementNew = createCard(cardNameValue, cardLinkValue, removeCard, onImageClick, like);
  cardsContainer.prepend(cardElementNew);
  closeModal(popupAdd);
  formElementCard.reset();
}

//Функция изменения профиля
function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

//Добавление карточек на страницу
initialCards.forEach (item => {
  const card = createCard(item.name, item.link, removeCard, onImageClick, like);
  addCard(card);
})

//Обработчики попапов
popupModals.forEach (popup => {
  popup.addEventListener('click', handleClickClose);
})

popupAddButton.addEventListener('click', () => openModal(popupAdd));

popupEditButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

//Обработчик функции изменения профиля
formElementProfile.addEventListener('submit', handleProfileEditFormSubmit); 

//Обработчик функции добавления новой карточки через форму
formElementCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
    handleCardAdd(cardNameInput.value, cardLinkInput.value)
})





