import lightGallery from 'lightgallery';

export default class PhotoViewer {
  constructor() {
    this.photos = [
      `./img/reviews/elena.jpg`,
      `./img/reviews/roman.jpg`,
      `./img/reviews/alina.jpg`,
      `./img/reviews/kirill.jpg`,
      `./img/reviews/dmitriy.jpg`,
      `./img/reviews/vadim.jpg`,
    ];

    this.photoOpeners = document.querySelectorAll(`.testimonials__source`);

    this._getSettings = this._getSettings.bind(this);
  }

  _getSettings() {
    return {
      dynamic: true,
      dynamicEl: this.photos.map((photo) => ({src: photo})),
    };
  }

  init() {
    this.photoOpeners.forEach((opener, index) => {
      const gallery = lightGallery(opener, this._getSettings());
      opener.addEventListener(`click`, () => gallery.openGallery(index));
    });
  }
}
