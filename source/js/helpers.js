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
