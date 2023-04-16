import MainMenuClass from '../components/mainMenu.js'

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

const menuClasses = {
    MainMenuClass1: new MainMenuClass(selectors.mainSection, selectors.allSectionElements),
    MainMenuClass2: new MainMenuClass(selectors.refillSection, selectors.allSectionElements),
    MainMenuClass3: new MainMenuClass(selectors.repairSection, selectors.allSectionElements),
    MainMenuClass4: new MainMenuClass(selectors.contactSection, selectors.allSectionElements),
    MainMenuClass5: new MainMenuClass(selectors.companySection, selectors.allSectionElements),
}

const constants = { selectors, menuClasses };

export default constants;