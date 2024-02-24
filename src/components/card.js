import { deleteCardApi, likeCardApi, deleteLikeApi } from './api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

// Функция создания карточки
function createCard (card, deleteCard, onImgClick, likeCard, user) {
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

    if (!(card.owner._id === user)) {
        cardDeleteButton.classList.add('card__delete-button__hidden');
    } else {
        cardDeleteButton.classList.remove('card__delete-button__hidden');
    }

    card.likes.forEach((userLike) => {
        if(userLike._id === user) {
            cardLikeButton.classList.add('card__like-button_is-active');
        } else {
            cardLikeButton.classList.remove('card__like-button_is-active');
        }
    })

    cardDeleteButton.addEventListener('click', () => deleteCard(cardElement, card));
    cardPicture.addEventListener("click", () => onImgClick(card.name, card.link));
    cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton, card, likeNumber));

    return cardElement;
}

// Функция удаления карточки
function removeCard (cardElement, card) {
    cardElement.remove();
    deleteCardApi(card)
        .catch((err) => {
            console.log('Ошибка удаления карточки', err);
        });
}

//Функция лайка по карточке
function like(likeButton, card, likeCounter) {
    if (!(likeButton.classList.contains('card__like-button_is-active'))) {
        likeCardApi(card)
            .then((card) => {
                likeButton.classList.add('card__like-button_is-active');
                likeCounter.textContent = card.likes.length;
            })
            .catch((err) => {
                console.log('Ошибка лайка карточки', err);
            })
    } else {
        deleteLikeApi(card)
            .then((card) => {
                likeButton.classList.remove('card__like-button_is-active');
                likeCounter.textContent = card.likes.length;
            })
            .catch((err) => {
                console.log('Ошибка удаления лайка карточки', err);
            })
    }
    
}

export { createCard, removeCard, like, cardTemplate, cardsContainer};