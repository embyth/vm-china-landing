import {blockBodyScroll, unblockBodyScroll, isEscKey} from "./helpers.js";

export default class Navigation {
  constructor() {
    this.isMenuOpen = false;

    this.button = document.querySelector(`.site-nav__toggle`);
    this.menuWrapper = document.querySelector(`.site-nav__list`);
    this.header = document.querySelector(`.main-header`);
    this.links = this.menuWrapper.querySelectorAll(`a`);

    this._closeMenu = this._closeMenu.bind(this);
    this._openMenu = this._openMenu.bind(this);
    this._menuKeydownHandler = this._menuKeydownHandler.bind(this);
    this._menuHandler = this._menuHandler.bind(this);
    this._linkClickHandler = this._linkClickHandler.bind(this);
  }

  _closeMenu() {
    this.isMenuOpen = false;

    this.menuWrapper.classList.remove(`site-nav__list--opened`);
    this.menuWrapper.classList.add(`site-nav__list--closed`);

    this.button.classList.remove(`is-active`);

    this.header.classList.remove(`main-header--opened`);

    unblockBodyScroll();
    document.removeEventListener(`keydown`, this._menuKeydownHandler);
  }

  _openMenu() {
    this.isMenuOpen = true;

    this.menuWrapper.classList.add(`site-nav__list--opened`);
    this.menuWrapper.classList.remove(`site-nav__list--closed`);

    this.button.classList.add(`is-active`);

    this.header.classList.add(`main-header--opened`);

    blockBodyScroll();
    document.addEventListener(`keydown`, this._menuKeydownHandler);
  }

  _menuKeydownHandler(evt) {
    if (isEscKey(evt)) {
      this._closeMenu();
    }
  }

  _menuHandler() {
    if (this.isMenuOpen) {
      this._closeMenu();
    } else {
      this._openMenu();
    }
  }

  _linkClickHandler(evt) {
    evt.preventDefault();

    const targetHref = evt.target.getAttribute(`href`);

    const sectionToScroll = document.querySelector(targetHref);

    if (!sectionToScroll) {
      this._closeMenu();
      return;
    }

    sectionToScroll.scrollIntoView({
      behavior: `smooth`
    });

    this._closeMenu();
  }

  init() {
    this.button.addEventListener(`click`, this._menuHandler);
    this.links.forEach((link) => link.addEventListener(`click`, this._linkClickHandler));
  }
}
