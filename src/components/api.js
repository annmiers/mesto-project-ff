const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
    headers: {
        authorization: '4f2e4442-7927-4763-b7d8-e854e0ed3eab',
        'Content-Type': 'application/json'
    }
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
} 

export const getUserData = () => {
    return fetch (`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const updateUserData = (newUserName, newUserDescription, profileTitle, profileDescription) => {
    return fetch (`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newUserName,
            about: newUserDescription
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(() => {
        profileTitle.textContent = newUserName;
        profileDescription.textContent = newUserDescription;
    })
}
    
export const createNewCard = (newCardName, newCardLink) => {
    return fetch (`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: newCardName,
            link: newCardLink
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const deleteCardApi = (card) => {
    return fetch (`${config.baseUrl}/cards/${card._id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const likeCardApi = (card) => {
    return fetch (`${config.baseUrl}/cards/likes/${card._id}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const deleteLikeApi = (card) => {
    return fetch (`${config.baseUrl}/cards/likes/${card._id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const updateAvatar = (newAvatar, profileAvatar) => {
    return fetch (`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: newAvatar,
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(() => {
        profileAvatar.style.backgroundImage = `url(${newAvatar})`;
    })
}



