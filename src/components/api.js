const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
    headers: {
        authorization: 'eb051ebf-2644-4cfe-b56d-7fb7bc91594f',
        'Content-Type': 'application/json'
    }
}

export function checkingResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function showError(err) {
    console.log(err);
}

// Информация о пользователе

export const createProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(checkingResponse)
}

// Отправка аватара

export const changeAvatar = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
    .then(checkingResponse)
}

// Создание карточек

export const createCardsFromServer = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(checkingResponse)
}

// Отправка информации о пользователе на сервер

export const createUserInfoForServer = (nameInput, jobInput) => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            name: nameInput,
            about: jobInput
        })
    })
    .then(checkingResponse)
}

// Отправка новой карточки на сервер

export const sendCardForServer = (titlelink, titleInput) => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({
            name: titleInput,
            link: titlelink
        })
    })
    .then(checkingResponse)
}

export const deleteCardFromServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        headers: config.headers,
        method: 'DELETE'
    })
    .then(checkingResponse)
}

export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: 'PUT'
    })
    .then(checkingResponse)
}

export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: 'DELETE'
    })
    .then(checkingResponse)
}