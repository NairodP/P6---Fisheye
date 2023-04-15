import {
  querySelector,
  getElementById,
  openAndClose,
  focusInside,
} from "./genRaccourci.js";

const carousel = getElementById("carousel-modal");

export function carouselAcces(target) {
  target.addEventListener("keydown", function (event) {
    const flecheGauche = querySelector(".fa-chevron-left", carousel);
    const flecheDroite = querySelector(".fa-chevron-right", carousel);
    const fermer = querySelector(".fa-times", carousel);

    switch (event.code) {
      case 27: // escape
      case "Escape":
        fermer.click();
        break;
      case 37: // touche de gauche
      case "ArrowLeft":
        flecheGauche.click();
        break;
      case 38: // touche du haut
      case "arrowUp":
        fermer.focus();
        break;
      case 39: // touche de droite
      case "ArrowRight":
        flecheDroite.click();
        break;
      case 40: // touche du bas
      case "arrowDown":
        if (target === fermer) {
          flecheDroite.focus();
        }
        break;
      case "Space":
      case "Enter":
      case 32:
      case 13:
        event.preventDefault();
        // console.log("ca marche");
        break;
      default:
        return;
    }
    event.preventDefault();
  });
}

export function openCarousel() {
  openAndClose(carousel);
  focusInside(carousel);
}

export function closeCarousel() {
  openAndClose(carousel);
}

export function playVideoOnEnterOrSpace(event) {
  const carouFocus = document.querySelector(".carousel");

  if (
    carouFocus === document.activeElement &&
    (event.code === "Enter" ||
      event.key === "Enter" ||
      event.code === "Space" ||
      event.key === " ")
  ) {
    const active = document.querySelector(".active-item-video");

    if (active) {
      const activeVideo = active.querySelector(".player");
      if (activeVideo.plyr.playing) {
        activeVideo.plyr.pause();
      } else {
        activeVideo.plyr.play();
      }
    }
  }
}

export function initVideoPlayer() {
  const player = new Plyr(".player");
  document.addEventListener("keydown", playVideoOnEnterOrSpace);
}
