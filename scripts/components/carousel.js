// Importation des fonctions utilitaires de manipulation du DOM
import {
  querySelector,
  querySelectorAll,
  setAttribute,
  appendChild,
  clickSimulation,
} from "../utils/genRaccourci.js";

// Importation des fonctions utilitaires pour la gestion du carousel
import {
  carouselAcces,
  closeCarousel,
  initVideoPlayer,
} from "../utils/carouselAcces.js";

// Définition de la classe Carousel
export default class Carousel {
  constructor(photographerName) {
    this.name = photographerName;
    this.modalCarousel = querySelector("#carousel-modal");
    this.carouselContents = document.createElement("div");
  }

  // Retourne l'élément actuel du carousel
  getActualItem() {
    return querySelector(".active-item") || querySelector(".active-item-video");
  }

  // Retourne la position de l'élément actuel dans le carousel
  getActualPosition() {
    return parseInt(
      this.getActualItem().getAttribute("data-name").split("-")[1]
    );
  }

  // Retourne la position du dernier élément dans le carousel
  getLatestPosition() {
    return parseInt(querySelectorAll("li").length);
  }

  // Définit l'élément actif du carousel
  setActiveItem(item) {
    setAttribute(
      querySelector("img", item) ? "active-item" : "active-item-video",
      item
    );
  }

  // Définit l'élément du carousel
  setCarouselItem(item) {
    setAttribute("carousel-item", item);
  }

  // Événements sur le carousel
  eventsOnCarousel() {
    const carousel = this.carouselContents;
    const leftButton = querySelector(".fa-chevron-left", carousel);
    const rightButton = querySelector(".fa-chevron-right", carousel);
    const closeButton = querySelector(".fa-times", carousel);

    // Événement pour le bouton de droite
    rightButton.addEventListener("click", () => {
      const nextPosition = this.getActualPosition() + 1;
      const nextItem =
        querySelector(`li[data-name="item-${nextPosition}"]`) ||
        querySelector('li[data-name="item-1"]');
      this.setCarouselItem(this.getActualItem());
      this.setActiveItem(nextItem);
    });

    // Événement pour le bouton de gauche
    leftButton.addEventListener("click", () => {
      const previousPosition = this.getActualPosition() - 1;
      const lastPosition = this.getLatestPosition();
      const previousItem =
        querySelector(`li[data-name="item-${previousPosition}"]`) ||
        querySelector(`li[data-name="item-${lastPosition}"]`);
      this.setCarouselItem(this.getActualItem());
      this.setActiveItem(previousItem);
    });

    // Événement pour le bouton de fermeture
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
  // Rendu du carousel
  carouselRender() {
    // Création du contenu du carousel avec des éléments HTML
    this.carouselContents.innerHTML = `
      <ul class="carousel" tabindex="1"></ul>
      <em class="fas fa-chevron-left" id="previous"  aria-label="Image précédente" tabindex="1"></em> 
      <em class="fas fa-chevron-right"  id="next" aria-label="Image suivante" tabindex="1"></em>
      <em class="fas fa-times" id="close" aria-label="Fermer la lightbox" tabindex="1"></em>
    `;

    // Ajout des événements aux boutons du carousel
    this.eventsOnCarousel();

    // Ajout du contenu du carousel à l'élément modalCarousel
    appendChild(this.carouselContents, this.modalCarousel);
  }
}
