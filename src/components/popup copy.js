const popupImageTitle = document.querySelector('#popup-image-title');
const popupImage = document.querySelector('.popup__image');
const popupImageOpened = document.querySelector('#popup-image');

//Функция открытия попапов

export function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

//Функция закрытия попапов

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

//Попап с картинкой

export function openImagePopup(imageCards, nameCards) {
    openPopup(popupImageOpened);
    popupImage.src = imageCards;
    popupImage.alt = nameCards;
    popupImageTitle.textContent = nameCards;
}

export function closePopupByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    };
}