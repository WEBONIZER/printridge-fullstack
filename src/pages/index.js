import '../pages/index.css'; 
import constants from '../utils/constants.js';

constants.selectors.logo.addEventListener('click', () => {
    constants.menuClasses.MainMenuClass1._toggleHidden()
    constants.menuClasses.MainMenuClass1._handleClick()
})

constants.selectors.mainPageElement.addEventListener('click', () => {
    constants.menuClasses.MainMenuClass1._toggleHidden()
    constants.menuClasses.MainMenuClass1._handleClick()
})

constants.selectors.mainRefillElement.addEventListener('click', () => {
    constants.menuClasses.MainMenuClass2._toggleHidden()
    constants.menuClasses.MainMenuClass2._handleClick()
})

constants.selectors.mainRepairElement.addEventListener('click', () => {
    constants.menuClasses.MainMenuClass3._toggleHidden()
    constants.menuClasses.MainMenuClass3._handleClick()
})

constants.selectors.mainContactsElement.addEventListener('click', () => {
    constants.menuClasses.MainMenuClass4._toggleHidden()
    constants.menuClasses.MainMenuClass4._handleClick()
})

constants.selectors.mainCompanyElement.addEventListener('click', () => {
    constants.menuClasses.MainMenuClass5._toggleHidden()
    constants.menuClasses.MainMenuClass5._handleClick()
})

function priceCreate (number, model, useIn, priseRefill, priseRecovery) {
    const newElement = constants.refillSelectors.templateRefill.querySelector('.cart-refill-template').cloneNode(true);
    newElement.querySelector('#refill__number').textContent = number;
    newElement.querySelector('#refill__model').textContent = model;
    newElement.querySelector('#refill__use-in').textContent = useIn;
    newElement.querySelector('#refill__prise-refill').textContent = priseRefill;
    newElement.querySelector('#refill__price-recovery').textContent = priseRecovery;
    return newElement;
}

constants.refillObject.forEach((item) => {
    constants.refillSelectors.tableRefill.append(priceCreate(item.modelCart, item.chip, item.devices, item.rfl, item.recovery));
    
})


