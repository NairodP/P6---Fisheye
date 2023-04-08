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

function checkElementFocus(element) {
  const cible = querySelector(".carousel", document)
  element.addEventListener("focus", function () {
    console.log(element);
  });
}

export function focusInside(modal) {
  const focusableElements = Array.from(
    modal.querySelectorAll(
      '[href], input, select, textarea, li[class="active-item"], li[class="active-item-video"], [tabindex]:not([tabindex="-1"])'
    )
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  modal.addEventListener("keydown", (event) => {
    const isTabPressed = event.key === "Tab" || event.code === "9";
    if (!isTabPressed) {
      return;
    }
    if (event.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        event.preventDefault();
      }
    } else if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      event.preventDefault();
    }
  });

  firstFocusableElement.focus();

  const list = querySelector(".carousel", document);
  console.log(list);
  
  if (checkElementFocus(list)) {

    const active = document.querySelector(".active-item-video");
    const activeVideo = active.querySelector(".player");

    console.log("ca marche");
    activeVideo.plyr.play();
  }
}

export function clickSimulation(target) {
  target.addEventListener("keydown", function (event) {
    switch (event.code) {
      case "Space":
      case "Enter":
      case 32:
      case 13:
        target.click();
        event.preventDefault();
        break;
      default:
        return;
    }
  });
}
