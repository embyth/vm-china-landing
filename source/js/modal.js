import Form from "./form.js";

import {blockBodyScroll, unblockBodyScroll, isEscKey} from "./helpers.js";

export default class Modal extends Form {
  constructor() {
    super();

    this.isModalOpen = false;

    this.modal = document.querySelector(`.modal`);
    this.modalOverlay = document.querySelector(`.modal__overlay`);
    this.modalOpener = document.querySelector(`.site-nav__request-call-button`);
    this.modalClose = document.querySelector(`.modal__close`);

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._modalCloseHandler = this._modalCloseHandler.bind(this);
    this._modalOpenHandler = this._modalOpenHandler.bind(this);
  }

  _escKeyDownHandler(evt) {
    if (isEscKey(evt)) {
      this._modalCloseHandler();
    }
  }

  _modalCloseHandler() {
    if (!this.isModalOpen) {
      return;
    }

    this.modalOverlay.classList.add(`modal__overlay--hidden`);
    this.modal.classList.add(`modal--hidden`);

    this.modalClose.removeEventListener(`click`, this._modalCloseHandler);
    this.modalOverlay.removeEventListener(`click`, this._modalCloseHandler);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);

    unblockBodyScroll();

    this.isModalOpen = false;
  }

  _modalOpenHandler() {
    if (this.isModalOpen) {
      return;
    }

    this.modalOverlay.classList.remove(`modal__overlay--hidden`);
    this.modal.classList.remove(`modal--hidden`);

    this.modalClose.addEventListener(`click`, this._modalCloseHandler);
    this.modalOverlay.addEventListener(`click`, this._modalCloseHandler);
    document.addEventListener(`keydown`, this._escKeyDownHandler);

    blockBodyScroll();

    this.isModalOpen = true;
  }

  closeModal() {
    this._modalCloseHandler();
  }

  initModal() {
    this.modalOpener.addEventListener(`click`, this._modalOpenHandler);
  }
}
