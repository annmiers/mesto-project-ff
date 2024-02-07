export {openModal, closeModal, handleClickClose };

//Функция окрытия модального окна
function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleCloseByEsc);
}

//Функция закрытия модального окна
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseByEsc);
}

//Функция закрытия модального окна по клавише ескейп
function handleCloseByEsc (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}

//Функция закрытия модального окна по крестику и оверлею
function handleClickClose (evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}