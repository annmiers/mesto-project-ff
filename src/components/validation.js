//Функция добавления ошибок
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

//Функция удаления ошибок
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const setEventListeners = (formElement, inputElement, buttonElement, inactiveButtonClass, inputErrorClass, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputElement));
    const buttonSubmit = formElement.querySelector(buttonElement);
    toggleButtonState(inputList, buttonSubmit, inactiveButtonClass);
    inputList.forEach((input) => {
        input.addEventListener('input', function () {
            checkInputValidity(formElement, input, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonSubmit, inactiveButtonClass);
        });
    });
};

//Функция поиска невалидного инпута
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

//Функция переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass)
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((form) => {
        form.addEventListener('submit', function(evt){
            evt.preventDefault();
        });
        setEventListeners(form, config.inputSelector, config.submitButtonSelector, config.inactiveButtonClass, config.inputErrorClass, config.errorClass);
    });
}

export const clearValidation = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonSubmit = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((input) => {
        hideInputError(formElement, input, config.inputErrorClass, config.errorClass);
    })
    formElement.reset();
    toggleButtonState(inputList, buttonSubmit, config.inactiveButtonClass);
}