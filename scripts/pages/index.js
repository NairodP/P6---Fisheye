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
      });
    }
  }
}

const page = new HomePage();
page.init();
