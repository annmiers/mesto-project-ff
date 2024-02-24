import { deleteCardApi, likeCardApi, deleteLikeApi } from './api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

// Функция создания карточки
function createCard (card, deleteCard, onImgClick, likeCard, userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardPicture = cardElement.querySelector('.card__image');
    const titleCard = cardElement.querySelector('.card__title');
    const imageCard = cardElement.querySelector('.card__image');
    const likeNumber = cardElement.querySelector('.card__like-number');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    titleCard.textContent = card.name;
    imageCard.alt = card.name;
    imageCard.src = card.link;
    likeNumber.textContent = card.likes.length;

    if (!(card.owner._id === userId)) {
        cardDeleteButton.classList.add('card__delete-button__hidden');
    } else {
        cardDeleteButton.classList.remove('card__delete-button__hidden');
        cardDeleteButton.addEventListener('click', () => deleteCard(cardElement, card));
    }

    if(card.likes.some(userLike => userLike._id === userId)){ 
        cardLikeButton.classList.add("card__like-button_is-active"); 
    }

    cardPicture.addEventListener("click", () => onImgClick(card.name, card.link));
    cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton, card, likeNumber));

    return cardElement;
}

// Функция удаления карточки
function removeCard (cardElement, card) {
    deleteCardApi(card)
        .catch((err) => {
            console.log('Ошибка удаления карточки', err);
        });
    cardElement.remove();
}

//Функция лайка по карточке
function like(likeButton, card, likeCounter) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const likeMethod = isLiked ? deleteLikeApi : likeCardApi;
    likeMethod(card) 
        .then((card) => { 
            likeButton.classList.toggle('card__like-button_is-active'); 
            likeCounter.textContent = card.likes.length; 
        })
        .catch(err => console.log(`Ошибка ${isLiked ? 'удаления ' : ''}лайка карточки`, err));
}

export { createCard, removeCard, like, cardTemplate, cardsContainer};