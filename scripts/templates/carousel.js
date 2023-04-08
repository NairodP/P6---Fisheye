import {
  querySelector,
  querySelectorAll,
  setAttribute,
  appendChild,
  clickSimulation,
} from "../utils/genRaccourci.js";

import {
  carrousselAcces,
  closeCarroussel,
  // playVideoOnEnterOrSpace,
} from "../utils/carrousselAcces.js";

export default class Carroussel {
  constructor(photographerName) {
    this.name = photographerName;
    this.modalCarroussel = querySelector("#carroussel-modal");
    this.carrousselContents = document.createElement("div");
  }
  getActualItem() {
    return querySelector(".active-item") || querySelector(".active-item-video");
  }
  getActualPosition() {
    return parseInt(
      this.getActualItem().getAttribute("data-name").split("-")[1]
    );
  }
  getLatestPosition() {
    return parseInt(querySelectorAll("li").length);
  }
  setActiveItem(item) {
    setAttribute(
      querySelector("img", item) ? "active-item" : "active-item-video",
      item
    );
  }
  setCarouselItem(item) {
    setAttribute("carousel-item", item);
  }
  carrousselEventsHandler() {
    const carroussel = this.carrousselContents;
    const leftButton = querySelector(".fa-chevron-left", carroussel);
    const rightButton = querySelector(".fa-chevron-right", carroussel);
    const closeButton = querySelector(".fa-times", carroussel);
    console.log(carroussel);
    



    rightButton.addEventListener("click", () => {
      const nextPosition = this.getActualPosition() + 1;
      const nextItem =
        querySelector(`li[data-name="item-${nextPosition}"]`) ||
        querySelector('li[data-name="item-1"]');
      this.setCarouselItem(this.getActualItem());
      this.setActiveItem(nextItem);
    });
    leftButton.addEventListener("click", () => {
      const previousPosition = this.getActualPosition() - 1;
      const lastPosition = this.getLatestPosition();
      const previousItem =
        querySelector(`li[data-name="item-${previousPosition}"]`) ||
        querySelector(`li[data-name="item-${lastPosition}"]`);
      this.setCarouselItem(this.getActualItem());
      this.setActiveItem(previousItem);
    });
    closeButton.addEventListener("click", () => {
      closeCarroussel(this.modalCarroussel);
      this.setCarouselItem(this.getActualItem());
    });
    this.modalCarroussel.style.display = "none";
    clickSimulation(leftButton);
    clickSimulation(rightButton);
    clickSimulation(closeButton);
    carrousselAcces(this.modalCarroussel);
    // playVideoOnEnterOrSpace(this.modalCarroussel);
  }
  carrousselRender() {
    this.carrousselContents.innerHTML = `<ul class="carousel" tabindex="1"></ul>
            <em class="fas fa-chevron-left" id="previous"  aria-label="Image précédente" tabindex="1"></em> 
            <em class="fas fa-chevron-right"  id="next" aria-label="Image suivante" tabindex="1"></em>
            <em class="fas fa-times" id="close" aria-label="Fermer la lightbox" tabindex="1"></em>`;
    this.carrousselEventsHandler();
    appendChild(this.carrousselContents, this.modalCarroussel);
  }
}
