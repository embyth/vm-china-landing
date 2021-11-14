import Modal from "./modal.js";

import {NotificationType, NotificationMessage} from "./const.js";
import {renderNotificationMessage} from "./helpers.js";

export default class Contact extends Modal {
  constructor() {
    super();

    this.endpointUrl = `/api/contact`;

    this.form = document.querySelector(`.modal__form`);
    this.inputs = this.form.querySelectorAll(`input`);
    this.nameInput = this.form.querySelector(`#modal-name`);
    this.phoneInput = this.form.querySelector(`#modal-phone`);
    this.textareaInput = this.form.querySelector(`#modal-text`);
    this.submitButton = this.form.querySelector(`.modal__form-submit`);

    this._submitFormHandler = this._submitFormHandler.bind(this);
  }

  _submitFormHandler(evt) {
    evt.preventDefault();

    const requiredInputs = [...this.inputs].filter((input) => input.required === true);

    if (!this.isUserDataValid(requiredInputs)) {
      this.shake(this.form);
      return;
    }

    this.disableElements([...this.inputs, this.textareaInput, this.submitButton]);

    const userData = {
      userName: this.nameInput.value,
      userPhone: this.phoneInput.value,
      userText: this.textareaInput.value,
    };

    fetch(this.endpointUrl, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify(userData),
    })
      .then(() => {
        this.enableElements([...this.inputs, this.textareaInput, this.submitButton]);
        this.clearInputs([...this.inputs, this.textareaInput]);
        this.closeModal();
        renderNotificationMessage(NotificationMessage.SUCCESS, NotificationType.SUCCESS);
      })
      .catch(() => {
        this.enableElements([...this.inputs, this.textareaInput, this.submitButton]);
        renderNotificationMessage(NotificationMessage.ERROR, NotificationType.ERROR);
      });
  }

  init() {
    this.initPhoneMask(this.phoneInput);
    this.initModal();
    this.submitButton.addEventListener(`click`, this._submitFormHandler);
  }
}
