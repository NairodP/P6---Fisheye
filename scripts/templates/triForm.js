import carouselMedia from "./carouselMedia.js";
import MediaCard from "./mediaCard.js";
import ProxyTri from "../proxy/proxyTri.js";
import {
  querySelector,
  querySelectorAll,
  appendChild,
  clickSimulation,
} from "../utils/genRaccourci.js";

export default class FiltreMenu {
  constructor(medias, name) {
    this.medias = medias;
    this.name = name;
    this.afterFiltre = document.createElement("div");
    this.filtreDiv = querySelector(".filtre");
    this.mediasSection = querySelector(".photograph_media");
    this.carouselDiv = querySelector(".carousel");
    this.ProxyTri = new ProxyTri();
  }

  async sorterMovies(filtre) {
    this.clearFiltre();
    let position = 1;

    // tri les medias pour la parties médias et pour le carousel
    if (filtre) {
      const sortedData = await this.ProxyTri.trieur(this.medias, filtre);
      const SortedMovies = sortedData.data;
      SortedMovies.forEach((media) => {
        // get media link
        media.link =
          media.type === "ImageMedia"
            ? media.getImage(this.name)
            : media.getVideo(this.name);
        media.position = position;
        new carouselMedia(media).carouselMediaRender();
        new MediaCard(media).mediaCard();

        position += 1;
      });
    } else {
      throw new Error("Pas de filtre sélectionné");
    }
  }

  selectDefaultOption() {
    const afterFiltre = this.afterFiltre;
    const selectedOption = querySelector("#selected-option", afterFiltre);
    const dropdownOptions = querySelectorAll("#dropdown li", afterFiltre);

    // Récupérer la première option
    const defaultOption = dropdownOptions[0];
    // console.log(defaultOption);

    // Mettre à jour la valeur de l'option sélectionnée
    const value = defaultOption.dataset.value;
    selectedOption.textContent = value;
    selectedOption.dataset.value = value;

    // Mettre à jour l'attribut aria-selected pour chaque option
    dropdownOptions.forEach(function (option) {
      option.setAttribute("aria-selected", option === defaultOption);
      // console.log(option);
    });
    this.sorterMovies("POPULARITE");
  }

  onChangeSorter() {
    const afterFiltre = this.afterFiltre;
    const dropdown = querySelector("#dropdown", afterFiltre);
    const selectedOption = querySelector("#selected-option", afterFiltre);
    const dropdownList = querySelector("#dropdown ol", afterFiltre);
    const dropdownOptions = querySelectorAll("#dropdown li", afterFiltre);

    dropdown.addEventListener("click", (e) => {
      const valueOfFilter = e.target.getAttribute("value");
      // console.log(valueOfFilter);
      if (valueOfFilter) {
        this.sorterMovies(valueOfFilter);
      } else return;
    });

    this.selectDefaultOption();
    // Au clic sur le menu déroulant
    dropdown.addEventListener("click", function (e) {
      // e.preventDefault();
      // e.stopPropagation();

      dropdown.classList.toggle("active");
      dropdown.setAttribute(
        "aria-expanded",
        !dropdown.classList.contains("active")
      );
      dropdownList.classList.toggle("filtreInvisible");
      dropdownList.setAttribute(
        "aria-hidden",
        !dropdownList.classList.contains("filtreInvisible")
      );

      const selectedOptionValue = selectedOption.dataset.value;
      dropdownOptions.forEach(function (option) {
        if (option.dataset.value === selectedOptionValue) {
          option.classList.add("hidden");
        } else {
          option.classList.remove("hidden");
        }
      });
    });

    dropdownOptions.forEach(function (option) {
      option.addEventListener("click", function () {
        const value = this.dataset.value;
        selectedOption.textContent = value;
        selectedOption.dataset.value = value;
        dropdownOptions.forEach(function (option) {
          option.setAttribute("aria-selected", option === this);
        }, this);
        const roundedBottomLi = document.querySelector(
          "#dropdown li.roundedBottom"
        );
        if (roundedBottomLi) {
          roundedBottomLi.classList.remove("roundedBottom");
        }
        // Récupération de tous les li, sauf ceux qui ont la class "hidden"
        const lis = Array.from(document.querySelectorAll("#dropdown li"));
        // Récupération de la valeur de selectedOption
        const selectedOptionValue = selectedOption.dataset.value;
        // Création d'un nouveau tableau sans le li qui a la même valeur que selectedOption
        const filteredLis = lis.filter(
          (li) => li.dataset.value !== selectedOptionValue
        );
        // Récupération du dernier li du nouveau tableau, sauf s'il a l'id "titreFiltre"
        let lastLi = filteredLis[filteredLis.length - 1];
        if (
          lastLi &&
          lastLi.id === "titreFiltre" &&
          lastLi.getAttribute("aria-selected") === "true"
        ) {
          lastLi = filteredLis[filteredLis.length - 2];
        }
        // console.log(lastLi);
        lastLi.classList.add("roundedBottom");
      });
    });

    // Ajouter un écouteur d'événement click sur le document
    document.addEventListener("click", function (event) {
      if (dropdown.classList.contains("active")) {
        return;
      } else {
        // Vérifier si le clic a été déclenché à l'intérieur de l'élément dropdown ou de son élément ol
        if (
          !dropdown.contains(event.target) &&
          !dropdownList.contains(event.target)
        ) {
          dropdown.classList.toggle("active");
          dropdown.setAttribute(
            "aria-expanded",
            !dropdown.classList.contains("active")
          );
          dropdownList.classList.toggle("filtreInvisible");
          dropdownList.setAttribute(
            "aria-hidden",
            !dropdownList.classList.contains("filtreInvisible")
          );
          const selectedOptionValue = selectedOption.dataset.value;
          dropdownOptions.forEach(function (option) {
            if (option.dataset.value === selectedOptionValue) {
              option.classList.add("hidden");
            } else {
              option.classList.remove("hidden");
            }
          });
        }
      }
    });

    /////
    clickSimulation(dropdown);
  }

  clearFiltre() {
    // Avant de mettre à jour l'affichage sur carousel et media
    this.mediasSection.innerHTML = "";
    this.carouselDiv.innerHTML = "";
  }

  renderFiltre() {
    const filtreMenu = `
                        <label for="dropdown">Trier par :</label>
                        <div
                          id="dropdown"
                          class="active"
                          aria-haspopup="listbox"
                          aria-expanded="false"
                          aria-owns="dropdown-options"
                          role="displayButton"
                          tabindex="3"
                        >
                          <span id="selected-option" data-value="Popularité"></span>
                          <svg id="chevron" viewBox="0 0 24 24" fill="#ffffff">
                            <polyline
                              fill="none"
                              id="Down"
                              points="5 8.5 12 15.5 19 8.5"
                              stroke="#ffffff"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            ></polyline>
                          </svg>
                          <ol class="filtreInvisible" aria-hidden="true">
                            <li
                              id="popFiltre"
                              tabindex="3"
                              name="sortbest"
                              value="POPULARITE"
                              aria-label="Trier par popularité"
                              aria-selected="false"
                              data-value="Popularité"
                              role="selectionFiltre"
                            >
                              Popularité
                            </li>
                            <li
                              id="dateFiltre"
                              tabindex="3"
                              name="sortdate"
                              value="DATE"
                              aria-label="Trier par date"
                              aria-selected="false"
                              data-value="Date"
                              role="selectionFiltre"
                            >
                              Date
                            </li>
                            <li
                              id="titreFiltre"
                              tabindex="3"
                              name="sorttitle"
                              value="TITRE"
                              aria-label="Trier par titre"
                              aria-selected="false"
                              data-value="Titre"
                              role="selectionFiltre"
                              class="roundedBottom"
                            >
                              Titre
                            </li>
                          </ol>
                        </div>
                        `;
    this.afterFiltre.innerHTML = filtreMenu;
    this.onChangeSorter();
    appendChild(this.afterFiltre, this.filtreDiv);
  }
}
