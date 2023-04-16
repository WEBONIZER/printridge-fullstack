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