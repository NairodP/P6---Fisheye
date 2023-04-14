// querySelector
export function querySelector(selector, parent = document) {
  return parent.querySelector(selector);
}

// querySelectorAll
export function querySelectorAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

// getElementById
export function getElementById(selector, parent = document) {
  return parent.getElementById(selector);
}

// appendChild
export function appendChild(dom, parent = document) {
  parent.appendChild(dom);
}

// setAttribute
export function setAttribute(className, parent = document) {
  parent.setAttribute("class", className);
}

// classList.toggle
export function classListToggle(className, parent = document) {
  parent.classList.toggle(className);
}

export function openAndClose(target) {
  // console.log(target);
  // console.log(target.id);
  const body = querySelector("body");
  const main = querySelector("#main");
  if (target.id === "contact-modal") {
    classListToggle("overflowHidden", body);
    target.toggleAttribute("aria-hidden");
    target.style.display = target.style.display === "none" ? "block" : "none";
  } else {
    main.style.display = main.style.display === "none" ? "block" : "none";
    classListToggle("overflowHidden", body);
    target.toggleAttribute("aria-hidden");
    target.style.display = target.style.display === "none" ? "block" : "none";
  }
}

// Pour les vérifs sur le carousel
// function checkElementFocus(element) {
//   element.addEventListener("focus", function () {
//     console.log(element);
//   });
// }

const contactModal = getElementById("contact-modal");

export function focusInside(modal) {
  console.log(modal);
  if (contactModal.style.display === "block") {
    const focusableElements = Array.from(
      modal.querySelectorAll("img, input, textarea")
    ).slice(0, 6); // On récupère les 6 premiers éléments focusables correspondant aux elts du formulaire

    modal.addEventListener("keydown", (event) => {
      const isTabPressed = event.key === "Tab" || event.code === "9";
      if (!isTabPressed) {
        return;
      }
      const index = focusableElements.indexOf(document.activeElement);
      if (event.shiftKey) {
        if (document.activeElement === focusableElements[0]) {
          focusableElements[focusableElements.length - 1].focus();
          event.preventDefault();
        } else {
          focusableElements[index - 1].focus();
          event.preventDefault();
        }
      } else {
        if (
          document.activeElement ===
          focusableElements[focusableElements.length - 1]
        ) {
          focusableElements[0].focus();
          event.preventDefault();
        } else {
          focusableElements[index + 1].focus();
          event.preventDefault();
        }
      }
    });

    focusableElements[0].focus(); // On met le focus sur le premier élément du tableau
  } else {
    const focusableElements = Array.from(
      modal.querySelectorAll(
        'button[type=submit], i[tabindex="1"], img[id="closeModal"], input, textarea, li[class="active-item"], [tabindex]:not([tabindex="-1"])'
      )
    );
    // const modal = document.querySelector('#exampleModal'); // select the modal by it's id
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

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
  }
}

export function clickSimulation(target) {
  target.addEventListener("keydown", function (event) {
    const elementType = event.target.tagName.toLowerCase();
    switch (event.code) {
      case "Space":
      case "Enter":
      case 32:
      case 13:
        if (elementType !== "textarea") {
          target.click();
          event.preventDefault();
        }
        break;
      default:
        return;
    }
  });
}
