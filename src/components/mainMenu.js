const MainMenuClass = class {
    constructor(sectionItem, sectionElements) {
        this.sectionItem = sectionItem;
        this.sectionElements = sectionElements;
    }

    _toggleHidden(){
        this.sectionElements.forEach((i) => {
            if (!i.classList.contains('sections_hidden')) {
                i.classList.toggle('sections_hidden')
            }
        })
    }

    _handleClick() {
        this.sectionItem.classList.remove('sections_hidden');
      }
    }

export default MainMenuClass;