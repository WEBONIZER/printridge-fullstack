import MainMenuClass from '../components/mainMenu.js'
import refillObject from '../source/refill.js'

const selectors = {
    mainMenu: document.querySelector('.main-menu'),
    mainMenuElements: document.querySelectorAll('.main-menu__element'),
    mainMenuElement: document.querySelector('.main-menu__element'),
    mainPageElement: document.querySelector('#main-page-element'),
    mainRefillElement: document.querySelector('#main-refill-element'),
    mainRepairElement: document.querySelector('#main-repair-element'),
    mainContactsElement: document.querySelector('#main-contacts-element'),
    mainCompanyElement: document.querySelector('#main-company-element'),
    sectionElement: document.querySelector('.section-element'),
    allSectionElements: document.querySelectorAll('.section-element'),
    mainSection: document.querySelector('.main-section'),
    refillSection: document.querySelector('.refill-section'),
    repairSection: document.querySelector('.repair-section'),
    contactSection: document.querySelector('.contact-section'),
    companySection: document.querySelector('.company-section'),
    sections: document.querySelector('.sections'),
    logo: document.querySelector('.header__logo'),
}

const refillSelectors = {
    templateRefill: document.querySelector('#cart-refill').content,
    tableRefill: document.querySelector('#table-refill'),
    number: document.querySelector('#refill__number'),
    model: document.querySelector('#refill__model'),
    useIn: document.querySelector('#refill__use-in'),
    priseRefill: document.querySelector('#refill__prise-refill'),
    priseRecovery: document.querySelector('#refill__price-recovery'),
}

const menuClasses = {
    MainMenuClass1: new MainMenuClass(selectors.mainSection, selectors.allSectionElements),
    MainMenuClass2: new MainMenuClass(selectors.refillSection, selectors.allSectionElements),
    MainMenuClass3: new MainMenuClass(selectors.repairSection, selectors.allSectionElements),
    MainMenuClass4: new MainMenuClass(selectors.contactSection, selectors.allSectionElements),
    MainMenuClass5: new MainMenuClass(selectors.companySection, selectors.allSectionElements),
}

const constants = { selectors, menuClasses, refillObject, refillSelectors };

export default constants;