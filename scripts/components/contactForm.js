import {
  getElementById,
  appendChild,
  setAttribute,
  querySelector,
  clickSimulation,
  focusInside,
} from "../utils/genRaccourci.js";

import {
  contactAcces,
  openContactForm,
  clearForm,
  formValidation,
  messageCheck,
  emailCheck,
  namesCheck,
} from "../utils/contactAcces.js";

export default class FormModal {
  constructor(photographerName) {
    this.photographerName = photographerName;
    this.formContents = document.createElement("div");
    setAttribute("modal", this.formContents);
    this.formModal = getElementById("contact-modal");
    this.formModal.setAttribute("aria-labelledBy", "formTitle");
  }

  handleEvents() {
    const form = this.formContents;
    const modal = getElementById("contact-modal");
    const contactButton = querySelector(".contact_button");
    const modalSubmit = querySelector(".submit_button", form);
    const closeModal = querySelector("#closeModal", form);
    const formContent = querySelector("#contactForm", form);
    const firstName = querySelector("#first", form);
    const lastName = querySelector("#last", form);
    const email = querySelector("#email", form);
    const message = querySelector("#message", form);

    modalSubmit.addEventListener("click", () => {
      formValidation(
        firstName,
        lastName,
        email,
        message,
        modalSubmit,
        formContent
      );
    });
    contactButton.addEventListener("click", () => {
      openContactForm(modal);
      firstName.focus();
    });
    closeModal.addEventListener("click", () => {
      clearForm(formContent, closeModal);
    });
    firstName.addEventListener("change", () => {
      namesCheck(firstName);
    });
    lastName.addEventListener("change", () => {
      namesCheck(lastName);
    });
    email.addEventListener("change", () => {
      emailCheck(email);
    });
    message.addEventListener("change", () => {
      messageCheck(message);
    });
    modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal.click();
        event.preventDefault();
      }
    });
    modal.style.display = "none";
    clickSimulation(modalSubmit);
    clickSimulation(closeModal);
    clickSimulation(modal);
  }

  // Rendu du formulaire
  formRender() {
    this.formContents.innerHTML = `
                        <header> 
                          <h2 id="formTitle">Contactez-moi ${this.photographerName}</h2>
                          <img id="closeModal" role="button" src="assets/icons/close.svg" alt="Fermer le formulaire de contacte" tabindex="1" />
                        </header>
                        <form  id="contactForm" action="photographer.html" onsubmit="return formValidation();" novalidate>
                          <!-- First Name -->
                          <div class="formData">
                            <label id="firstLabel" for="first">Prénom</label>
                            <br>
                            <input class="text-control" type="text" id="first" name="first" placeholder="Entrer votre prénom" aria-labelledBy="firstLabel"/>
                            <br>
                          </div>
                          <!-- Last Name -->
                          <div class="formData">
                            <label id="lastLabel" for="last">Nom</label>
                            <br>
                            <input class="text-control" type="text" id="last" name="last" placeholder="Entrer votre nom" aria-labelledBy="lastLabel"/>
                            <br>
                          </div>
                          <!-- Email -->
                          <div class="formData">
                            <label id="emailLabel" for="email">E-mail</label>
                            <br>
                            <input class="text-control" type="email" id="email" name="email" placeholder="Entrer votre email" aria-labelledBy="emailLabel"/>
                            <br>
                          </div>
                          <!-- Message -->
                          <div class="formData">
                            <label id="messageLabel" for="message">Message</label>
                            <br>
                            <textarea class="text-control" id="message" name="message" rows="3" cols="50" placeholder="Entrer votre message" aria-labelledBy="messageLabel"></textarea>
                            <br>
                          </div>
                          <div class="formData">
                            <input role="button" type="button" class="contact_button submit_button button" value="Envoyer" aria-label="Envoyer votre message" />
                          </div>
                        </form>`;
    this.handleEvents();
    appendChild(this.formContents, this.formModal);
  }
}