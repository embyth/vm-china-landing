import Form from "./form.js";

import {NotificationType, NotificationMessage} from "./const.js";
import {renderNotificationMessage} from "./helpers.js";

export default class Calculate extends Form {
  constructor() {
    super();

    this.endpointUrl = `/api/calculate`;

    this.form = document.querySelector(`.calc__form`);
    this.inputs = this.form.querySelectorAll(`input`);
    this.textareas = this.form.querySelectorAll(`textarea`);

    this.calcMethod = this.form.querySelectorAll(`input[name="calc-method"]`);
    this.calcFrom = this.form.querySelector(`#calc-from`);
    this.calcTo = this.form.querySelector(`#calc-to`);
    this.calcName = this.form.querySelector(`#calc-name`);
    this.calcQuantity = this.form.querySelector(`#calc-quantity`);
    this.calcInsurance = this.form.querySelectorAll(`input[name="calc-insurance"]`);
    this.calcCustoms = this.form.querySelectorAll(`input[name="calc-customs"]`);
    this.calcWeight = this.form.querySelector(`#calc-weight`);
    this.calcVolume = this.form.querySelector(`#calc-volume`);
    this.calcDescription = this.form.querySelector(`#calc-description`);
    this.calcUserName = this.form.querySelector(`#calc-user-name`);
    this.calcUserPhone = this.form.querySelector(`#calc-user-phone`);
    this.calcUserEmail = this.form.querySelector(`#calc-user-email`);

    this.submitButton = this.form.querySelector(`.calc__form-submit`);

    this._submitFormHandler = this._submitFormHandler.bind(this);
  }

  _submitFormHandler(evt) {
    evt.preventDefault();

    const requiredInputs = [...this.inputs, this.textareas].filter((input) => input.required === true);

    if (!this.isUserDataValid(requiredInputs)) {
      this.shake(this.form);
      return;
    }

    this.disableElements([...this.inputs, ...this.textareas, this.submitButton]);

    const userData = {
      calcMethod: [...this.calcMethod].find((item) => item.checked).value,
      calcFrom: this.calcFrom.value,
      calcTo: this.calcTo.value,
      calcName: this.calcName.value,
      calcQuantity: this.calcQuantity.value,
      calcInsurance: [...this.calcInsurance].find((item) => item.checked).value,
      calcCustoms: [...this.calcCustoms].find((item) => item.checked).value,
      calcWeight: this.calcWeight.value,
      calcVolume: this.calcVolume.value,
      calcDescription: this.calcDescription.value,
      userName: this.calcUserName.value,
      userPhone: this.calcUserPhone.value,
      userEmail: this.calcUserEmail.value,
    };

    fetch(this.endpointUrl, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify(userData),
    })
      .then(() => {
        this.clearInputs([...this.inputs, ...this.textareas]);
        this.enableElements([...this.inputs, ...this.textareas, this.submitButton]);
        renderNotificationMessage(NotificationMessage.SUCCESS, NotificationType.SUCCESS);
      })
      .catch(() => {
        this.enableElements([...this.inputs, ...this.textareas, this.submitButton]);
        renderNotificationMessage(NotificationMessage.ERROR, NotificationType.ERROR);
      });
  }

  init() {
    this.initPhoneMask(this.calcUserPhone);
    this.submitButton.addEventListener(`click`, this._submitFormHandler);
  }
}
