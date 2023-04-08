// affiche les données de la page principale

import * as Api from "../api/Api.js";
import PhotographerCard from "../templates/photographerCard.js";

class HomePage {
  async init() {
    // Récup les données des photographes
    const photographers = await new Api.PhotographerApi(
      "photographers"
    ).getAllPhotographers();
    this.displayIndexData(photographers);
  }

  async displayIndexData(photographers) {
    if (photographers) {
      let index = 2; // ordonne photographes dans la page et permet d'utiliser tabindex (pour utiliser clavier ou tablette)
      photographers.forEach((photographer) => {
        photographer.index = index;
        const card = new PhotographerCard(photographer);
        // Affiche infos des photographes
        document
          .querySelector(".photographer_section")
          .appendChild(card.getPhotographerCard());
        index += 1;
        // ordonne les photographes sur la page (attribut tabindex) pour permettre aux utilisateurs de naviguer avec le clavier ou une tablette
      });
    }
  }
}

// créé une instance de la class HomePage pour appeller la méthode init et lancer l'affichage des données
const page = new HomePage();
page.init();
