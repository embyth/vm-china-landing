import {NotificationType} from "./const.js";

export const setFooterYear = () => {
  const footerYearContainer = document.querySelector(`.site-footer__copyright--year`);
  footerYearContainer.textContent = new Date().getFullYear();
};

export const blockBodyScroll = () => {
  const body = document.querySelector(`.page`);
  body.classList.add(`hide-scroll`);
};

export const unblockBodyScroll = () => {
  const body = document.querySelector(`.page`);
  body.classList.remove(`hide-scroll`);
};

export const isEscKey = (evt) => {
  return evt.keyCode === 27;
};

export const highlightInput = (input) => {
  const inputType = input.classList.contains(`input`) ? `input` : `textarea`;
  input.classList.add(`${inputType}--invalid`);
};

export const resetHighlightInput = (input) => {
  const inputType = input.classList.contains(`input`) ? `input` : `textarea`;
  input.classList.remove(`${inputType}--invalid`);
};

export const renderNotificationMessage = (message, type) => {
  const divElement = document.createElement(`div`);
  divElement.style.cssText = `
    position: fixed;
    z-index: 20;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 5px 10px;
    color: white;
    background-color: ${type === NotificationType.ERROR ? `red` : `green`};
    text-align: center;
  `;
  divElement.textContent = message;
  document.body.append(divElement);

  setTimeout(() => divElement.remove(), 5000);
};

export const isWebpSupported = () => {
  return new Promise((res) => {
    const webP = new Image();
    webP.src = `data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA`;
    webP.onload = webP.onerror = () => {
      res(webP.height === 2);
    };
  });
};
