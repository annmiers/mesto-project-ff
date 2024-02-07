// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

// Функция создания карточки
function createCard (cardTitle, cardImage, deleteCard, onImgClick, likeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardPicture = cardElement.querySelector('.card__image');
    const titleCard = cardElement.querySelector('.card__title');
    const imageCard = cardElement.querySelector('.card__image');

    titleCard.textContent = cardTitle;
    imageCard.alt = cardTitle;
    imageCard.src = cardImage;

    cardDeleteButton.addEventListener('click', deleteCard);
    cardPicture.addEventListener("click", () => onImgClick(cardTitle, cardImage));
    cardElement.addEventListener('click', likeCard);

    return cardElement;
}

// Функция удаления карточки
function removeCard (evt) {
    const item = evt.target.closest('.card');
    item.remove();
}

//Функция лайка по карточке
function like(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}

export { createCard, removeCard, like, cardTemplate, cardsContainer};