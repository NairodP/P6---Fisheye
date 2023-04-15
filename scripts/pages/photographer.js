import * as Api from "../api/Api.js";
import PhotographerCard from "../components/photographerCard.js";
import { querySelector, appendChild } from "../utils/genRaccourci.js";
import FormModal from "../components/contactForm.js";
import triForm from "../components/triForm.js";
import Carousel from "../components/carousel.js";

// Définition de la classe "PhotographerPage"
class PhotographerPage {
  // Fonction pour afficher la galerie de médias d'un photographe
  renderGallery(medias, photographer) {
    // Récupération du nom du photographe
    const { name } = photographer;
    // Création de la carte du photographe
    const card = new PhotographerCard(photographer);
    // Création du carrousel pour afficher la galerie de médias
    const carousel = new Carousel(name);

    // Calcul du total de likes pour tous les médias du photographe
    let likes = 0;
    medias.forEach((media) => {
      likes += media.likes;
    });

    // Affichage du total de likes du photographe à l'écran
    appendChild(
      card.getPhotographerLikes(likes),
      querySelector(".photograph_likes")
    );

    // Affichage des informations du photographe à l'écran
    appendChild(card.getPhotographerInfo(), querySelector(".photograph_info"));

    // Affichage de la photo du photographe à l'écran
    appendChild(
      card.getPhotographerPicture(),
      querySelector(".photograph_picture")
    );

    // Création de la fenêtre modale pour le formulaire de contact
    const form = new FormModal(photographer.name);
    form.formRender();

    // Création de la fenêtre modale pour la galerie de médias
    carousel.carouselRender();

    // Affichage de la galerie de médias triée et filtrée
    new triForm(medias, name).renderFiltre();
  }

  // Fonction principale pour initialiser la page
  async init() {
    // Récupération de l'ID du photographe à partir de l'URL
    const id = new URLSearchParams(window.location.search).get("id")
      ? new URLSearchParams(window.location.search).get("id")
      : (location.href = "index.html");

    // Récupération des informations sur le photographe à partir de l'API
    const photographer = await new Api.PhotographerApi(
      "photographers"
    ).getOnePhotographer(id);

    // Récupération des médias du photographe à partir de l'API
    const medias = await new Api.MediaApi("media").getMediaOfPhotographer(id);

    // Affichage de la galerie de médias du photographe à l'écran
    this.renderGallery(medias, photographer);
  }
}

// Création d'une instance de la classe "PhotographerPage" et appel de la fonction "init"
const page = new PhotographerPage();
page.init();
