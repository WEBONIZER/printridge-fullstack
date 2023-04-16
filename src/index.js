import { createCard, createCards } from './components/card.js'
import * as valid from "./components/validate.js";
import * as api from "./components/api.js";
import { openPopup, closePopup } from './components/popup.js';
import './pages/index.css'; // добавляем импорт главного файла стилей 

// Переменные

export const cardTemplate = document.querySelector('#card-template').content;
const popupEditOpened = document.querySelector('#popup-edit');
const popapAvatar = document.querySelector('#popup-avatar');
const avatar = document.querySelector('.profile__avatar-hover');
const nameInput = document.querySelector('#popup-input-name');
const jobInput = document.querySelector('#popup-input-about');
const profileName = document.querySelector('.profile__name');
const profileResearch = document.querySelector('.profile__research');
const popupAddOpened = document.querySelector('#popup-add');
export const elementsBox = document.querySelector('.elements');
const buttonEditOpened = document.querySelector('.profile__edit');
const closeButtons = document.querySelectorAll('.popup__close');
const overlays = document.querySelectorAll('.popup');
const titlelink = document.querySelector('#popup-input-link');
const titleInput = document.querySelector('#popup-input-title');
const buttonAddOpened = document.querySelector('.profile__add');
const popupAddButton = document.querySelector('#button-add-create');
const popupEditButton = document.querySelector('#button-edit-save');
const popupAvatarButton = document.querySelector('#button-add-avatar');
const avatarLink = document.querySelector('#popup-avatar-link');
const avatarElement = document.querySelector('.profile__avatar');
let id;

// Селекторы для валидации

export const selectors = {
    popupErrorInput: '.popup__input_error-',
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input_error_active'
}

//Открытие попапа редактирования

buttonEditOpened.addEventListener('click', function () {
    valid.buttonBlock(popupEditButton, selectors);
    nameInput.value = profileName.textContent;
    jobInput.value = profileResearch.textContent;
    openPopup(popupEditOpened);
})

//Открытие попапа добавления

buttonAddOpened.addEventListener('click', function () {
    valid.buttonBlock(popupAddButton, selectors);
    openPopup(popupAddOpened);
    titlelink.value = '';
    titleInput.value = '';
})

// Открытие попапа смены аватара
avatar.addEventListener('click', function () {
    valid.buttonBlock(popupAvatarButton, selectors);
    openPopup(popapAvatar);
    avatarLink.value = '';
})

// Закрытие попапов по кнопке

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
})

//Закрытие попапов по оверлею и Esc

overlays.forEach((overlay) => {
    const modal = overlay.closest('.popup');
    overlay.addEventListener('click', function (evt) {
        if (evt.target == modal)
            closePopup(modal);
    });
})

// Функция редактирования профиля

function editProfile(evt) {
    evt.preventDefault();
    renderLoading(evt.submitter, 'Сохранение...')
    api.createUserInfoForServer(nameInput.value, jobInput.value)
        .then(() => {
            profileName.textContent = nameInput.value;
            profileResearch.textContent = jobInput.value;
            closePopup(popupEditOpened);
        })
        .catch(api.showError)
        .finally(() => {
            renderLoading(evt.submitter, 'Сохранить'); 
        })
}

//Добавление карточки

function createOneCard(evt) {
    evt.preventDefault();
    renderLoading(evt.submitter, 'Сохранение...');
    api.sendCardForServer(titlelink.value, titleInput.value)
        .then((data) => {
            console.log(data)
            elementsBox.prepend(createCard(data.link, data.name, id, data));
            closePopup(popupAddOpened);
            titlelink.value = '';
            titleInput.value = '';
        })
        .catch(api.showError)
        .finally(() => {
            renderLoading(evt.submitter, 'Создать');
        })
}

// Карточки с сервера

Promise.all([api.createProfileInfo(), api.createCardsFromServer()])
    .then(([info, cards]) => {
        profileName.textContent = info.name;
        profileResearch.textContent = info.about;
        avatarElement.src = info.avatar;
        id = info._id;
        createCards(cards, id);
    })
    .catch(api.showError)

// Функция смены аватара

function createNewAvatar(evt) {
    evt.preventDefault();
    renderLoading(evt.submitter, 'Сохранение...')
    api.changeAvatar(avatarLink.value)
        .then(() => {
            avatarElement.src = avatarLink.value;
            closePopup(popapAvatar);
        })
        .catch(api.showError)
        .finally(() => { 
            renderLoading(evt.submitter, 'Сохранить'); 
        })
}

function renderLoading(item, text) {
    item.textContent = text;
}

// Слушатель кнопки редактирования

popupEditOpened.addEventListener('submit', editProfile);

// Слушатель кнопки добавления карточки

popupAddOpened.addEventListener('submit', createOneCard);

// Слушатель кнопки смены аватара

popapAvatar.addEventListener('submit', createNewAvatar);

// Вызываем функцию валидации

valid.enableValidation(selectors);