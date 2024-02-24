//Импорт стилей
import './pages/index.css';
//Импорт функциий создания, удаления и добавления карточки на страницу
import { createCard, removeCard, like, cardsContainer } from './components/card.js';
//Импорт функций открытия и закрытия модальных окон
import { openModal, handleClickClose, closeModal } from './components/modal.js';
// import { initialCards } from './components/cards.js';
//Импорт функций валидации формы
import { enableValidation, clearValidation } from './components/validation.js'; 
//Импорт функций api
import { getUserData, getInitialCards, updateUserData, createNewCard, updateAvatar } from './components/api.js';


//Переменные юзера и карточки
let userId;

//Настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// DOM узлы
const popupModals = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupEditAvatar = document.querySelector('.popup_type_new-avatar');
const popupSubmitButtonAdd = popupAdd.querySelector('.popup__button');
const popupSubmitButtonEdit = popupEdit.querySelector('.popup__button');
const popupSubmitButtonEditAvatar = popupEditAvatar.querySelector('.popup__button');

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

const formElementProfileImage = popupEditAvatar.querySelector('.popup__form');
const profileImageInput = document.querySelector('.popup__input_type_url_avatar');


const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');


// Вывести карточки на страницу
function addCard(card) {
  cardsContainer.append(card);
}

//Загрузка данных пользователя и карточек
Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;
    cards.forEach (item => {
      const currentCard = createCard(item, removeCard, onImageClick, like, userId);
      addCard(currentCard);
    })
  })
  .catch((err) => {
    console.error('Ошибка загрузки данных', err);
  })

//Функция обработчика клика по картинке
function onImageClick(cardTitle, cardImage){
  popupCaption.textContent = cardTitle;
  popupImage.alt = cardTitle;
  popupImage.src = cardImage;
  openModal(popupTypeImage);
}

//Функция добавления новой карточки через форму
function handleCardAdd(cardName, cardLink, button) {
  renderLoading(true, button);
  createNewCard(cardName, cardLink)
    .then((card) => {
      const cardElementNew = createCard(card, removeCard, onImageClick, like, userId);
      cardsContainer.prepend(cardElementNew);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {
      renderLoading(false, button);
      closeModal(popupAdd);
      formElementCard.reset();
    })
}

//Функция изменения профиля
function handleProfileEditFormSubmit(nameInput, jobInput, profileTitle, profileDescription, button) {
  renderLoading(true, button);
  updateUserData(nameInput, jobInput)
    .then(() => {
      profileTitle.textContent = nameInput;
      profileDescription.textContent = jobInput;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {
      renderLoading(false, button);
      closeModal(popupEdit);
    })
}

//Функция изменения аватара
function handleProfileEditAvatarFormSubmit(profileImageInput, profileImage, button) {
  renderLoading(true, button);
  updateAvatar(profileImageInput)
    .then(() => {
      profileImage.style.backgroundImage = `url(${profileImageInput})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {
      renderLoading(false, button);
      closeModal(popupEditAvatar);
    })
}

//Функция для отображения загрузки
function renderLoading(isLoading, button) {
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

//Обработчики попапов
popupModals.forEach (popup => {
  popup.addEventListener('click', handleClickClose);
})

popupAddButton.addEventListener('click', () => {
  openModal(popupAdd);
  formElementCard.reset();
  clearValidation(formElementCard, validationConfig);
});

popupEditButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formElementProfile, validationConfig);
  openModal(popupEdit);
});

profileImage.addEventListener('click', () => {
  openModal(popupEditAvatar);
  formElementProfileImage.reset();
  clearValidation(formElementProfileImage, validationConfig);
})

//Обработчик функции изменения профиля
formElementProfile.addEventListener('submit', function(evt){
  evt.preventDefault(); 
  handleProfileEditFormSubmit(nameInput.value, jobInput.value, profileTitle, profileDescription, popupSubmitButtonEdit);
});  

//Обработчик функции добавления новой карточки через форму
formElementCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  handleCardAdd(cardNameInput.value, cardLinkInput.value, popupSubmitButtonAdd)
})

//Обработчик функции изменения автара
formElementProfileImage.addEventListener('submit', function(evt) {
  handleProfileEditAvatarFormSubmit(profileImageInput.value, profileImage, popupSubmitButtonEditAvatar)
})

//Валидация форм
enableValidation(validationConfig); 




