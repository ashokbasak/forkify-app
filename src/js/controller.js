import * as model from './model.js';
import icons from 'url:../img/icons.svg';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookMarkView from './views/bookMarkView.js';
import addRecipeView from './views/addRecipeView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const recipeContainer = document.querySelector('.recipe');
const navList = document.querySelector('.nav');

//https:forkify-api.herokuapp.com/v2
const navIcon = function () {
  const markup = `
  <ul class="nav__list">
            <li class="nav__item">
              <button class="nav__btn nav__btn--add-recipe">
                <svg class="nav__icon">
                  <use href="${icons}#icon-edit"></use>
                </svg>
                <span>Add recipe</span>
              </button>
            </li>
            <li class="nav__item">
              <button class="nav__btn nav__btn--bookmarks">
                <svg class="nav__icon">
                  <use href="${icons}#icon-bookmark"></use>
                </svg>
                <span>Bookmarks</span>
              </button>
  `;
  navList.innerHTML = '';
  navList.insertAdjacentHTML('afterbegin', markup);
  //render bookmarks
  bookMarkView.render(model.state.bookmarks);
};
navIcon();

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    //update results view to mark selected search result
    resultView.update(model.getSearchResultsPage());
    //loading recipe
    await model.loadRecipe(id);

    //Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(`${err}???`);
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    //get search query
    const query = searchView.getQuery();
    if (!query) return;
    //load search results
    await model.loadSearchResults(query);
    //render results

    resultView.render(model.getSearchResultsPage());

    //render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //render results
  resultView.render(model.getSearchResultsPage(goToPage));

  //render new pagination buttons
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  //update the recipe servings(in state)
  model.updateServings(newServings);
  //update the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //add or remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //updat recipe view
  recipeView.update(model.state.recipe);

  // //render bookmarks
  // bookMarkView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  console.log('Welcome');
};
init();
