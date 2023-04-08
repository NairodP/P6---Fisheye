import {
  getElementById,
  openAndClose,
  focusInside,
} from "../utils/genRaccourci.js";

const contactForm = getElementById("contact-modal");

export function contactAcces() {}

export function openContactForm() {
  openAndClose(contactForm);
  focusInside(contactForm);
}

export function closeContactForm() {
  openAndClose(contactForm);
}

// Gestion de la visibilité des erreurs
function dataErrorInvisible(element) {
  element.closest(".formData").setAttribute("data-error-visible", "false");
  element.closest(".formData").setAttribute("data-error", "");
}
function dataErrorVisible(element, message) {
  element.closest(".formData").setAttribute("data-error-visible", "true");
  element.closest(".formData").setAttribute("data-error", message);
}

// Validation champs formulaire
export function namesCheck(name) {
  if (name === "") {
    dataErrorVisible(name, "Veuillez saisir au moins 2 lettres");
    return false;
  } else if (!/^([a-zA-Z\u00C0-\u00FF]{2,}\s*)+$/.test(name.value)) {
    dataErrorVisible(name, "Veuillez saisir uniquement des lettres");
    return false;
  }
  dataErrorInvisible(name);
  return true;
}

export function emailCheck(email) {
  if (email === "") {
    dataErrorVisible(email, "Veuillez saisir une adresse e-mail");
    return false;
  } else if (
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(email.value)
  ) {
    dataErrorVisible(email, "Veuillez saisir une adresse e-mail valide");
    return false;
  }
  dataErrorInvisible(email);
  return true;
}

export function messageCheck(message) {
  if (message === "") {
    dataErrorVisible(message, "Veuillez saisir votre message");
    return false;
  } else if (
    !/^(?=.*[A-Za-z].*[A-Za-z])(?=.*\b\w+\b)(?=.*\b\w+\b).*$/.test(
      message.value
    )
  ) {
    dataErrorVisible(message, "Votre message doit contenir au minimum 2 mots");
    return false;
  }
  dataErrorInvisible(message);
  return true;
}

// Validation champs formulaire
export function formValidation(
  firstName,
  lastName,
  email,
  message,
  modalSubmit,
  formContent
) {
  if (
    namesCheck(firstName) &&
    namesCheck(lastName) &&
    emailCheck(email) &&
    messageCheck(message)
  ) {
    dataErrorInvisible(modalSubmit);
    // const data = new FormData(formContent);
    // const value = Object.fromEntries(data.entries());

    clearForm(formContent, closeModal);
    return true;
  }

  dataErrorVisible(modalSubmit, "Veuillez compléter l'ensemble du formulaire");
  return false;
}

// Vide le formulaire
export function clearForm(formContent) {
  formContent.style.display = "block";
  formContent.reset();
  closeContactForm(getElementById("contact-modal"));
}

