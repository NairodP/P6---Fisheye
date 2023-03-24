import {
  querySelector,
  classListToggle,
  querySelectorAll,
  setAttribute,
  appendChild,
} from "../utils/shortcutDom.js";

const body = document.querySelector("body");
const main = document.querySelector("#main");

function onModal(target) {
  main.style.display = main.style.display === "none" ? "block" : "none";
  classListToggle("no-scroll", body);
  target.toggleAttribute("aria-hidden");
  target.style.display = target.style.display === "none" ? "block" : "none";
}
const lightboxModal = querySelector(".lightbox_modal");
const onCloseLightboxModal = () => {
  onModal(lightboxModal);
};

const onEnterClick = (target) => {
  target.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.target.click();
      event.preventDefault();
    }
  });
};

export const onKeyDown = (target) => {
  target.addEventListener(
    "keydown",
    (event) => {
      if (event.defaultPrevented) {
        return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
      }
      switch (event.key) {
        case "ArrowLeft":
          // Faire quelque chose pour la touche "left arrow" pressée.
          querySelector(".fa-chevron-left", target).click();
          break;
        case "ArrowRight":
          // Faire quelque chose pour la touche "right arrow" pressée.
          querySelector(".fa-chevron-right", target).click();
          break;
        case "Escape":
          // Faire quelque chose pour la touche "esc" pressée.
          querySelector(".fa-times", target).click();
          break;
        default:
          return; // Quitter lorsque cela ne gère pas l'événement touche.
      }

      // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
      event.preventDefault();
    },
    true
  );
};

export default class Carroussel {
  constructor(photographerName) {
    this.name = photographerName;
    this.modalCarroussel = querySelector(".lightbox_modal");
    this.$wrapperCarroussel = document.createElement("div");
  }

  // Obtenir élément affiché
  getActualItem() {
    return querySelector(".active-item")
      ? querySelector(".active-item")
      : querySelector(".active-item-video");
  }

  // Position actuelle de l'el
  getActualPosition() {
    const actualItem = this.getActualItem();
    return parseInt(actualItem.getAttribute("data-name").split("-")[1]);
  }

  // Obtenir dernière position
  getLatestPosition() {
    return parseInt(querySelectorAll("li").length);
  }

  // Display new item
  setActiveItem(item) {
    querySelector("img", item)
      ? setAttribute("active-item", item)
      : setAttribute("active-item-video", item);
  }

  // Hide last item
  setCarouselItem(item) {
    setAttribute("carousel-item", item);
  }

  // Events handler
  carrousselEventsHandler() {
    // DOM $Wrapper
    const carroussel = this.$wrapperCarroussel;
    // Buttons
    const leftButton = querySelector(".fa-chevron-left", carroussel);
    const rightButton = querySelector(".fa-chevron-right", carroussel);
    const closeButton = querySelector(".fa-times", carroussel);

    // EVENTS 
    // Display next item
    rightButton.addEventListener("click", () => {
      const nextPosition = this.getActualPosition() + 1;
      const nextItem = querySelector(`li[data-name="item-${nextPosition}"]`)
        ? querySelector(`li[data-name="item-${nextPosition}"]`)
        : querySelector('li[data-name="item-1"]');

      this.setCarouselItem(this.getActualItem());
      this.setActiveItem(nextItem);
    });
    // Display previous item
    leftButton.addEventListener("click", () => {
      const previousPosition = this.getActualPosition() - 1;
      const lastPosition = this.getLatestPosition();
      const previousItem = querySelector(
        `li[data-name="item-${previousPosition}"]`
      )
        ? querySelector(`li[data-name="item-${previousPosition}"]`)
        : querySelector(`li[data-name="item-${lastPosition}"]`);

      this.setCarouselItem(this.getActualItem());
      this.setActiveItem(previousItem);
    });
    // Close the lightbox
    closeButton.addEventListener("click", () => {
      onCloseLightboxModal();
      this.setCarouselItem(this.getActualItem());
    });
    // Accessibility Events handler
    this.modalCarroussel.style.display = "none";
    onEnterClick(leftButton);
    onEnterClick(rightButton);
    onEnterClick(closeButton);
    onKeyDown(this.modalCarroussel);
  }

  carrousselRender() {
    // Generate the nav elements
    this.$wrapperCarroussel.innerHTML = `<ul class="carousel" tabindex="1"></ul>
            <em class="fas fa-chevron-left" id="previous"  aria-label="Image précédente" tabindex="1"></em> 
            <em class="fas fa-chevron-right"  id="next" aria-label="Image suivante" tabindex="1"></em>
            <em class="fas fa-times" id="close" aria-label="Fermer la lightbox" tabindex="1"></em>`;

    this.carrousselEventsHandler();
    appendChild(this.$wrapperCarroussel, this.modalCarroussel);
  }
}
