import carouselMedia from "./carouselMedia.js";
import MediaCard from "./mediaCard.js";
import ProxyTri from "../proxy/proxyTri.js";
import {
  querySelector,
  setAttribute,
  classListToggle,
  appendChild,
  clickSimulation,
} from "../utils/genRaccourci.js";

export default class SorterForm {
  constructor(medias, name) {
    this.medias = medias;
    this.name = name;
    this.afterFiltre = document.createElement("div");
    this.filtreDiv = querySelector(".filtre");
    this.$mediasWrapper = querySelector(".photograph_media");
    this.carouselDiv = querySelector(".carousel");
    this.ProxyTri = new ProxyTri();
  }

  async sorterMovies(sorter) {
    this.clearWrappers();
    let position = 1;
    // Generate the sorted medias galery and carousel
    if (sorter) {
      const sortedData = await this.ProxyTri.trieur(this.medias, sorter);
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
      throw new Error("No sorter selected");
    }
  }

  unselect() {
    setAttribute(
      "unselected",
      querySelector('label[for="sort-best"', this.afterFiltre)
    );
    setAttribute(
      "unselected",
      querySelector('label[for="sort-date"', this.afterFiltre)
    );
    setAttribute(
      "unselected",
      querySelector('label[for="sort-title"', this.afterFiltre)
    );
  }

  clearSelect() {
    setAttribute("", querySelector('label[for="sort-best"', this.afterFiltre));
    setAttribute("", querySelector('label[for="sort-date"', this.afterFiltre));
    setAttribute("", querySelector('label[for="sort-title"', this.afterFiltre));
  }

  onChangeSorter() {
    // Sorter management
    const dropdown = this.afterFiltre.querySelector(".dropdown-el");
    const bestSorter = this.afterFiltre.querySelector("#sort-best");
    dropdown.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const selectedItem = querySelector(`#${e.target.htmlFor}`, this.afterFiltre);
      if (!dropdown.classList.contains("expanded")) {
        this.clearSelect();
        classListToggle("expanded", dropdown);
      } else if (selectedItem) {
        classListToggle("expanded", dropdown);
        this.unselect();
        e.target.setAttribute("class", "selected");
        this.sorterMovies(selectedItem.value);
      } else {
        bestSorter.click();
      }
    });
    clickSimulation(dropdown);
    this.sorterMovies("POPULARITE");
  }

  clearWrappers() {
    // Reset media and carousel content
    this.$mediasWrapper.innerHTML = "";
    this.carouselDiv.innerHTML = "";
  }

  render() {
    // Generate the sorter element
    const sorterForm = `
                        <label id="dropdownForSort">Trier par : </label>
                        
                        <span class="dropdown-el" id="dropdownSort" aria-labelledBy="dropdownForSort" role="group" tabindex="3">
                            <input type="radio" name="sortbest" role="selectSorter" value="POPULARITE" id="sort-best" aria-labelledBy="bestLabel">
                                <label id="bestLabel" for="sort-best"  aria-label="Trier par popularité" tabindex="3">Popularité</label>
                            <input type="radio" name="sortdate" role="selectSorter"  value="DATE" id="sort-date" aria-labelledBy="dateLabel">
                                <label id="dateLabel" for="sort-date" class="unselected" aria-label="Trier par date" tabindex="3">Date</label>
                            <input type="radio" name="sorttitle" role="selectSorter" value="TITRE" id="sort-title" aria-labelledBy="titleLabel">
                                <label id="titleLabel" for="sort-title" class="unselected" aria-label="Trier par titre" tabindex="3">Titre</label>
                        </span>`;
    this.afterFiltre.innerHTML = sorterForm;
    this.onChangeSorter();
    appendChild(this.afterFiltre, this.filtreDiv);
  }
}
