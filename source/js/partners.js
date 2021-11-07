import Swiper, {Navigation} from "swiper";

import {MEDIA_BREAKPOINTS} from "./const.js";

import "swiper/css";

export default class Partners {
  constructor() {
    this.container = document.querySelector(`.partners__swiper`);
    this.viewport = document.documentElement.clientWidth || window.innerWidth;
    this.swiper = null;
    this.initialOptions = {
      modules: [Navigation],
      loop: true,
      grabCursor: true,
      slideClass: `partners__item`,
      navigation: {
        nextEl: `.swiper-button-next`,
        prevEl: `.swiper-button-prev`,
      },
    };

    this._getSwiperOptions = this._getSwiperOptions.bind(this);
  }

  _getSwiperOptions() {
    if (this.viewport >= MEDIA_BREAKPOINTS.DESKTOP) {
      return Object.assign({}, this.initialOptions, {
        slidesPerView: 6,
        allowTouchMove: false
      });
    } else if (this.viewport >= MEDIA_BREAKPOINTS.TABLET) {
      return Object.assign({}, this.initialOptions, {slidesPerView: 3});
    }

    return Object.assign({}, this.initialOptions, {slidesPerView: 1});
  }

  init() {
    this.swiper = new Swiper(this.container, this._getSwiperOptions());
  }
}
