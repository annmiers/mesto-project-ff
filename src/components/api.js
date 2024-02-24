const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
    headers: {
        authorization: '4f2e4442-7927-4763-b7d8-e854e0ed3eab',
        'Content-Type': 'application/json'
    }
}

const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then((res) => {
        return handleResponse(res);
    })
} 

export const getUserData = () => {
    return fetch (`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then((res) => {
        return handleResponse(res);
    })
}

export const updateUserData = (newUserName, newUserDescription) => {
    return fetch (`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newUserName,
            about: newUserDescription
        })
    })
    .then((res) => {
        return handleResponse(res);
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
        return handleResponse(res);
    })
}

export const deleteCardApi = (card) => {
    return fetch (`${config.baseUrl}/cards/${card._id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        return handleResponse(res);
    })
}

export const likeCardApi = (card) => {
    return fetch (`${config.baseUrl}/cards/likes/${card._id}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then((res) => {
        return handleResponse(res);
    })
}

export const deleteLikeApi = (card) => {
    return fetch (`${config.baseUrl}/cards/likes/${card._id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        return handleResponse(res);
    })
}

export const updateAvatar = (newAvatar) => {
    return fetch (`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: newAvatar,
        })
    })
    .then((res) => {
        return handleResponse(res);
    })
}



