import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  parentElement = document.querySelector('.upload');

  window = document.querySelector('.add-recipe-window');
  overlay = document.querySelector('.overlay');
  btnOpen = document.querySelector('.nav__btn--add-recipe');
  btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.addHandlerShowWindow();
  }

  addHandlerShowWindow() {
    this.btnOpen.addEventListener('click', function () {
      this.overlay.classList.toggle('hidden');
      this.window.classList.toggle('hidden');
    });
  }
  
  generateMarkup() {}
}

export default new AddRecipeView();
