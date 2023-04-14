import {
  querySelector,
  querySelectorAll,
  setAttribute,
  appendChild,
  clickSimulation,
} from "../utils/genRaccourci.js";

import {
  carouselAcces,
  closeCarousel,
  initVideoPlayer,
} from "../utils/carouselAcces.js";

export default class Carousel {
  constructor(photographerName) {
    this.name = photographerName;
    this.modalCarousel = querySelector("#carousel-modal");
    this.carouselContents = document.createElement("div");
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
  eventsOnCarousel() {
    const carousel = this.carouselContents;
    const leftButton = querySelector(".fa-chevron-left", carousel);
    const rightButton = querySelector(".fa-chevron-right", carousel);
    const closeButton = querySelector(".fa-times", carousel);

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
      closeCarousel(this.modalCarousel);
      this.setCarouselItem(this.getActualItem());
    });
    this.modalCarousel.style.display = "none";
    clickSimulation(leftButton);
    clickSimulation(rightButton);
    clickSimulation(closeButton);
    carouselAcces(this.modalCarousel);
    initVideoPlayer();
  }
  carouselRender() {
    this.carouselContents.innerHTML = `<ul class="carousel" tabindex="1"></ul>
            <em class="fas fa-chevron-left" id="previous"  aria-label="Image précédente" tabindex="1"></em> 
            <em class="fas fa-chevron-right"  id="next" aria-label="Image suivante" tabindex="1"></em>
            <em class="fas fa-times" id="close" aria-label="Fermer la lightbox" tabindex="1"></em>`;
    this.eventsOnCarousel();
    appendChild(this.carouselContents, this.modalCarousel);
  }
}
