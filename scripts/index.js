// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard (cardTitle, cardImage) {
  
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardTitle;
  cardElement.querySelector('.card__image').src = cardImage;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', removeCard);

  return cardElement;
}

function addCard(card) {
  placesList.append(card);
}

initialCards.forEach (card => {
  const template = createCard(card.name, card.link);
  addCard(template);
})

function removeCard (evt) {
  const item = evt.target.closest('.card');
  item.remove();
}



