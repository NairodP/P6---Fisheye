import {
  querySelector,
  getElementById,
  openAndClose,
  focusInside,
} from "../utils/genRaccourci.js";

function clickAtCenter(element) {
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  element.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
    })
  );
}

const carroussel = getElementById("carroussel-modal");

export function carrousselAcces(target) {
  target.addEventListener("keydown", function (event) {
    const flecheGauche = querySelector(".fa-chevron-left", carroussel);
    const flecheDroite = querySelector(".fa-chevron-right", carroussel);
    const fermer = querySelector(".fa-times", carroussel);

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

export function openCarroussel() {
  openAndClose(carroussel);
  focusInside(carroussel);
}

export function closeCarroussel() {
  openAndClose(carroussel);
}


export function playVideoOnEnterOrSpace(event) {
  const carouFocus = document.querySelector(".carousel");
  console.log(carouFocus);

  carouFocus.addEventListener("focus", function (event) {
    const active = document.querySelector(".active-item-video");
    console.log(active);
    const activeVideo = active.querySelector(".player");
    console.log(activeVideo);
    if (
      (event.key === "Enter" || event.key === " ") &&
      active === document.activeElement
    ) {
      activeVideo.plyr.play();
    }
  });
}
