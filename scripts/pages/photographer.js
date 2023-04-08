import * as Api from "../api/Api.js";
import PhotographerCard from "../templates/photographerCard.js";
import { querySelector, appendChild } from "../utils/genRaccourci.js";
import FormModal from "../templates/contactForm.js";
import triForm from "../templates/triForm.js";
import Carroussel from "../templates/carousel.js";

class PhotographerPage {
  renderGallery(medias, photographer) {
    const { name } = photographer;
    const card = new PhotographerCard(photographer);
    const carroussel = new Carroussel(name);

    // display photographer's likes
    let likes = 0;
    medias.forEach((media) => {
      likes += media.likes;
    });
    // display Photographer's price / like DOM
    appendChild(
      card.getPhotographerLikes(likes),
      querySelector(".photograph_likes")
    );
    // display photographer's informations
    appendChild(card.getPhotographerInfo(), querySelector(".photograph_info"));
    // display Photographer's picture
    appendChild(
      card.getPhotographerPicture(),
      querySelector(".photograph_picture")
    );

    // Create Modal Form
    const form = new FormModal(photographer.name);
    form.formRender();
    // Create Modal Lightbox
    carroussel.carrousselRender();
    // display media's gallery
    new triForm(medias, name).render();
  }

  async init() {
    // Get photographe's ID from the url  // If not ID, return to homepage
    const id = new URLSearchParams(window.location.search).get("id")
      ? new URLSearchParams(window.location.search).get("id")
      : (location.href = "index.html");
    // Get photographe's data by ID
    const photographer = await new Api.PhotographerApi(
      "photographers"
    ).getOnePhotographer(id);
    // Get Media data
    const medias = await new Api.MediaApi("media").getMediaOfPhotographer(id);

    this.renderGallery(medias, photographer);
  }
}

const page = new PhotographerPage();
page.init();
