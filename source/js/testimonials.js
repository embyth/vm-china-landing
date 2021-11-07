import Swiper, {Navigation} from "swiper";

import {MEDIA_BREAKPOINTS} from "./const.js";

import "swiper/css";

export default class Testimonials {
  constructor() {
    this.container = document.querySelector(`.testimonials__swiper`);
    this.viewport = document.documentElement.clientWidth || window.innerWidth;
    this.swiper = null;
    this.initialOptions = {
      modules: [Navigation],
      loop: true,
      grabCursor: true,
      spaceBetween: 30,
      centeredSlides: true,
      slideClass: `testimonials__item`,
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
        centeredSlides: false,
        slidesPerView: 3,
      });
    } else if (this.viewport >= MEDIA_BREAKPOINTS.TABLET) {
      return Object.assign({}, this.initialOptions, {slidesPerView: 2});
    }

    return Object.assign({}, this.initialOptions, {slidesPerView: 1});
  }

  init() {
    this.swiper = new Swiper(this.container, this._getSwiperOptions());
  }
}
