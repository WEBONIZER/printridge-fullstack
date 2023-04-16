import { cardTemplate, elementsBox } from '../pages/index.js'
import * as api from "./api.js";
import { openImagePopup } from './popup.js'

//Создание карточки

export function createCard(imageCards, nameCards, id, cardInfo) {
    const newElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
    const likeButton = newElement.querySelector('#like');
    const elementImage = newElement.querySelector('.elements__image');
    const cartElement = newElement.querySelector('.elements__delete-button');
    elementImage.src = imageCards;
    elementImage.alt = nameCards;
    newElement.querySelector('.elements__name').textContent = nameCards;
    newElement.querySelector('#likes-count').textContent = cardInfo.likes.length;
    createLike(likeButton, cardInfo._id, newElement)
    newElement.querySelector('.elements__image').addEventListener('click', () => openImagePopup(imageCards, nameCards));
    if (cardInfo.owner._id !== id) {
        cartElement.remove();
    }
    if (cartElement) {
        deleteMyCard(cardInfo._id, cartElement, newElement)

    }
    return newElement;
}

export function createCards(cards, id) {
    cards.forEach(item => {
        elementsBox.append(createCard(item.link, item.name, id, item));
    });

}

// Добавление и удаление лайков

function createLike(likeButton, cardId, newElement) {
    likeButton.addEventListener('click', () => {
        if (!likeButton.classList.contains('elements__button_active')) {
            api.putLike(cardId)
                .then((data) => {
                    newElement.querySelector('#likes-count').textContent = data.likes.length;
                    likeButton.classList.toggle('elements__button_active');
                })
                .catch(api.showError)
        } else {
            api.deleteLike(cardId)
                .then((data) => {
                    newElement.querySelector('#likes-count').textContent = data.likes.length;
                    likeButton.classList.toggle('elements__button_active');
                })
                .catch(api.showError)
        }
    })
}

// Удаление карточки

export function deleteMyCard(cardId, cartElement, newElement) {
    cartElement.addEventListener('click', function () {
        api.deleteCardFromServer(cardId)
            .then(() => {
                newElement.closest('.elements__element').remove();
            })
            .catch(api.showError)
    })
}