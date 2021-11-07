import {gsap} from 'gsap';

import {MEDIA_BREAKPOINTS} from './const.js';

export default class Hero {
  constructor() {
    this._clientX = null;
    this._clientY = null;

    this.viewport = document.documentElement.clientWidth || window.innerWidth;

    this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
    this._updateRequestAnimation = this._updateRequestAnimation.bind(this);
    this._handleCardAppearance = this._handleCardAppearance.bind(this);
  }

  _mouseMoveHandler(evt) {
    const sectionHeight = document.querySelector(`#hero`).offsetHeight;

    this._clientX = evt.pageX;
    this._clientY = evt.pageY;

    if (evt.pageY > sectionHeight) {
      this._clientY = sectionHeight;
    }

    window.requestAnimationFrame(this._updateRequestAnimation);
  }

  _updateRequestAnimation() {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = this._clientX - cx;
    const dy = this._clientY - cy;
    const tiltX = dy / cy;
    const tiltY = dx / cx;
    const radius = Math.sqrt(Math.pow(tiltX, 2) + Math.pow(tiltY, 2));
    const degree = radius * 13;
    gsap
      .to(`.hero__content`, {
        transform: `rotate3d(${tiltX}, ${tiltY}, 0, ${degree}deg)`
      })
      .duration(1);
  }

  _handleCardAppearance() {
    gsap.to(`.port--animation`, {zoom: 1});
    gsap.to(`.port-bg`, {opacity: 1, duration: 0.1, delay: 0.25});
    gsap.to(`.port-ship`, {top: 263, left: 39, opacity: 1, duration: 0.35, delay: 0.3});
    gsap.to(`.port-self`, {top: 158, left: 265, opacity: 1, duration: 0.1});
    gsap.to(`.port-bird-1`, {top: 76, left: 606, opacity: 1, duration: 0.25});
    gsap.to(`.port-sea`, {opacity: 1, duration: 0.225});
    gsap.to(`.port-buyo`, {top: 409, left: 122, opacity: 1, duration: 0.225, delay: 0.2});
    gsap.to(`.port-bird-2`, {left: 26, opacity: 1, duration: 0.35, delay: 0.25});
  }

  init() {
    if (this.viewport >= MEDIA_BREAKPOINTS.DESKTOP) {
      document.body.addEventListener(`mousemove`, this._mouseMoveHandler);
      this._handleCardAppearance();
    }
  }
}
