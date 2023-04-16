import '../pages/index.css'; 
import constants from '../utils/constants.js';

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
//constants.selectors.mainPageElement.addEventListener('click', MainMenuClass1.reloadHiddenSection())

/*class MenuMain extends MainMenuClass {
    constructor(menuItem, sectionItem){

    }
} */
/*function mainPageElementReload () {
    document.querySelectorAll('.section-element').forEach((i) => {
        console.log(i)
       if (!i.classList.contains('sections_hidden')) {
        mainSection.classList.add('sections_hidden')
       }
    })
   if (mainSection.classList.contains('sections_hidden')) {
        mainSection.classList.toggle('sections_hidden')
    } else {
        mainSection.classList.toggle('sections_hidden')
    }
}

mainPageElement.addEventListener('click', mainPageElementReload)

function mainRefillElementReload () {
    document.querySelectorAll('.section-element').forEach((i) => {
       if (!i.classList.contains('sections_hidden')) {
        mainSection.classList.add('sections_hidden')
       }
    })
    
   if (refillSection.classList.contains('sections_hidden')) {
    refillSection.classList.toggle('sections_hidden')
    } else {
        refillSection.classList.toggle('sections_hidden')
    }
}

mainRefillElement.addEventListener('click', mainRefillElementReload)*/

