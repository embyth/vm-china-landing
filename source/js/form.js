import IMask from "imask";

import {SHAKE_ANIMATION_TIMEOUT, ErrorMessage} from "./const.js";
import {highlightInput, resetHighlightInput} from "./helpers.js";

export default class Form {
  constructor() {
    if (new.target === Form) {
      throw new Error(`Can't instantiate Form, only concrete one.`);
    }

    this.phoneNumberPattern = /^(\+7|7|8)?[\s\-]?\(?[0123456789][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm;
  }

  _checkInputValidity(input) {
    if (input.validity.valueMissing) {
      if (input.name.includes(`name`)) {
        input.setCustomValidity(ErrorMessage.NAME_MISSING);
      } else if (input.name.includes(`phone`)) {
        input.setCustomValidity(ErrorMessage.PHONE_MISSING);
      } else {
        input.setCustomValidity(ErrorMessage.VALUE_MISSING);
      }
      input.reportValidity();
      highlightInput(input);
    } else if (input.validity.patternMismatch) {
      input.setCustomValidity(ErrorMessage.INVALID_NUMBER);
      input.reportValidity();
      highlightInput(input);
    } else {
      input.setCustomValidity(``);
      resetHighlightInput(input);
    }
  }

  isUserDataValid(inputs) {
    const notValidInputs = [];

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        highlightInput(input);
        notValidInputs.push(input);
        input.addEventListener(`input`, (evt) => this._checkInputValidity(evt.target));
      }
    });

    if (notValidInputs.length) {
      this._checkInputValidity(notValidInputs[0]);
    }

    return notValidInputs.length === 0;
  }

  shake(element) {
    element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      element.style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  disableElements(elements) {
    elements.forEach((element) => {
      element.disabled = true;
    });
  }

  enableElements(elements) {
    elements.forEach((element) => {
      element.disabled = false;
    });
  }

  clearInputs(inputs) {
    inputs.forEach((input) => {
      input.value = ``;
    });
  }

  initPhoneMask(input) {
    IMask(input, {mask: `+{7} (000) 000-00-00`}); // eslint-disable-line
  }
}
