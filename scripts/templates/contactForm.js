import {
  querySelector,
  getElementById,
  appendChild,
  setAttribute,
  classListToggle,
} from "../utils/shortcutDom.js";

const body = document.querySelector("body");
const main = document.querySelector("#main");

function onModal(target) {
  main.style.display = main.style.display === "none" ? "block" : "none";
  classListToggle("no-scroll", body);
  target.toggleAttribute("aria-hidden");
  target.style.display = target.style.display === "none" ? "block" : "none";
}

export const trapFocus = (modal) => {
  // add all the elements inside modal which you want to make focusable
  const focusableElements = Array.from(
    modal.querySelectorAll(
      'button[type=submit], i[tabindex="1"], img[id="closeModal"], input, textarea, li[class="active-item"], [tabindex]:not([tabindex="-1"])'
    )
  );
  // const modal = document.querySelector('#exampleModal'); // select the modal by it's id
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  document.addEventListener("keydown", (e) => {
    const isTabPressed = e.key === "Tab" || e.code === "9";
    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      e.preventDefault();
    }
  });
  firstFocusableElement.focus();
};

const contactModal = querySelector("#contact-modal");

const onOpenContactModal = () => {
  onModal(contactModal);
  trapFocus(contactModal);
};
//
const onCloseContactModal = () => {
  onModal(contactModal);
};

const onEnterClick = (target) => {
  target.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.target.click();
      event.preventDefault();
    }
  });
};

const onEscapeClick = (target) => {
  target.addEventListener("keypress", (event) => {
    if (event.key === "Escape") {
      event.target.click();
      event.preventDefault();
    }
  });
};

// **************

export default class FormModal {
  constructor(photographerName) {
    this.photographerName = photographerName;
    this.$wrapperForm = document.createElement("div");
    setAttribute("modal", this.$wrapperForm);
    this.wrapperModal = getElementById("contact-modal");
    this.wrapperModal.setAttribute("aria-labelledBy", "formTitle");
  }

  //* ******************** DISPLAY MESSAGES  ***********************************/
  // clear validation message
  clearValidationMessage(element) {
    element.closest(".formData").setAttribute("data-error-visible", "false");
    element.closest(".formData").setAttribute("data-error", "");
  }

  // set validation message
  setValidationMessage(element, message) {
    element.closest(".formData").setAttribute("data-error-visible", "true");
    element.closest(".formData").setAttribute("data-error", message);
  }

  //* ******************** CHECK FUNCTIONS  ***********************************/
  // check names function
  namesCheck(name) {
    if (!/^([a-zA-Z\u00C0-\u00FF]{2,}\s*)+$/.test(name.value) || name === "") {
      this.setValidationMessage(
        name,
        "Veuillez saisir des lettres seulement !"
      );
      return false;
    }
    this.clearValidationMessage(name);
    return true;
  }

  // check email function
  emailCheck(email) {
    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(email.value) ||
      email === ""
    ) {
      this.setValidationMessage(
        email,
        "Veuillez saisir une adresse e-mail valide !"
      );
      return false;
    }
    this.clearValidationMessage(email);
    return true;
  }

  //* ******************** FORM VALIDATION  ***********************************/
  formValidation(firstName, lastName, email, modalSubmit, formContent) {
    // check all fields
    if (
      this.namesCheck(firstName) &&
      this.namesCheck(lastName) &&
      this.emailCheck(email)
    ) {
      this.clearValidationMessage(modalSubmit);
      // display json in logs
      const data = new FormData(formContent);
      const value = Object.fromEntries(data.entries());
      
      this.clearForm(formContent, closeModal);
      return true;
    }
    // display required message
    this.setValidationMessage(
      modalSubmit,
      "Veuillez compléter les champs obligatoires !"
    );
    return false;
  }

  // form reset
  clearForm(formContent) {
    formContent.style.display = "block";
    formContent.reset();
    onCloseContactModal(getElementById("contact-modal"));
  }

  // Events handler
  handleEvents() {
    // DOM $Wrapper
    const form = this.$wrapperForm;
    // Modal
    const modal = getElementById("contact-modal");
    // Buttons
    const contactButton = querySelector(".contact_button");
    const modalSubmit = querySelector(".submit_button", form);
    const closeModal = querySelector("#closeModal", form);
    // Form & Success
    const formContent = querySelector("#contactForm", form);
    // Fileds
    const firstName = querySelector("#first", form);
    const lastName = querySelector("#last", form);
    const email = querySelector("#email", form);

    // EVENTS
    modalSubmit.addEventListener("click", () => {
      this.formValidation(firstName, lastName, email, modalSubmit, formContent);
    });
    contactButton.addEventListener("click", (target) => {
      onOpenContactModal(modal);
      firstName.focus();
    });
    closeModal.addEventListener("click", () => {
      this.clearForm(formContent, closeModal);
    });
    firstName.addEventListener("change", () => {
      this.namesCheck(firstName);
    });
    lastName.addEventListener("change", () => {
      this.namesCheck(lastName);
    });
    email.addEventListener("change", () => {
      this.emailCheck(email);
    });
    modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal.click();
        event.preventDefault();
      }
    });
    modal.style.display = "none";
    onEnterClick(modalSubmit);
    onEnterClick(closeModal);
    onEscapeClick(modal);
  }

  getFormRender() {
    // DOM Wrapper Generate the form
    this.$wrapperForm.innerHTML = `
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
    appendChild(this.$wrapperForm, this.wrapperModal);
  }
}
