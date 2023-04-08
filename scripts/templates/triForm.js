import carrousselMedia from "./carrousselMedia.js";
import MediaCard from "./mediaCard.js";
import ProxyTri from "../proxy/proxyTri.js";
import {
  querySelector,
  setAttribute,
  classListToggle,
  appendChild,
} from "../utils/genRaccourci.js";

const onEnterClick = (target) => {
  target.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.target.click();
      event.preventDefault();
    }
  });
};

export default class SorterForm {
  constructor(medias, name) {
    this.medias = medias;
    this.name = name;
    this.$wrapper = document.createElement("div");
    this.$sorterFormWrapper = querySelector(".filtre");
    this.$mediasWrapper = querySelector(".photograph_media");
    this.$carouselWrapper = querySelector(".carousel");

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
        new carrousselMedia(media).MediaRender();
        new MediaCard(media).getMediaCardDOM();

        position += 1;
      });
    } else {
      throw new Error("No sorter selected");
    }
  }

  unselect() {
    setAttribute(
      "unselected",
      querySelector('label[for="sort-best"', this.$wrapper)
    );
    setAttribute(
      "unselected",
      querySelector('label[for="sort-date"', this.$wrapper)
    );
    setAttribute(
      "unselected",
      querySelector('label[for="sort-title"', this.$wrapper)
    );
  }

  clearSelect() {
    setAttribute("", querySelector('label[for="sort-best"', this.$wrapper));
    setAttribute("", querySelector('label[for="sort-date"', this.$wrapper));
    setAttribute("", querySelector('label[for="sort-title"', this.$wrapper));
  }

  onChangeSorter() {
    // Sorter management
    const dropdown = this.$wrapper.querySelector(".dropdown-el");
    const bestSorter = this.$wrapper.querySelector("#sort-best");
    dropdown.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const selectedItem = querySelector(`#${e.target.htmlFor}`, this.$wrapper);
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
    onEnterClick(dropdown);
    this.sorterMovies("POPULARITE");
  }

  clearWrappers() {
    // Reset media and carousel content
    this.$mediasWrapper.innerHTML = "";
    this.$carouselWrapper.innerHTML = "";
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
    // const sorterForm = `<label id="dropdownForSort">Trier par : </label>
    //                     <form class="bg">
    //                       <div class="select" tabindex="1">
    //                         <i class="fa-solid fa-chevron-up" style="color: #000000;"></i>
    //                         <input
    //                           class="selectopt"
    //                           name="test"
    //                           type="radio"
    //                           id="opt1"
    //                           checked
    //                           tabindex="0"
    //                         />
    //                         <label for="opt1" class="option" tabindex="0">
    //                           <span class="border-top"></span>
    //                         Date</label>
    //                         <input class="selectopt" name="test" type="radio" id="opt2" tabindex="0" />
    //                         <label for="opt2" class="option">
    //                           <span class="border-top"></span>
    //                         Popularité</label>
    //                         <input class="selectopt" name="test" type="radio" id="opt3" tabindex="0" />
    //                         <label for="opt3" class="option">
    //                           <span class="border-top"></span>
    //                         Titre</label>
    //                       </div>
    //                     </form>`;

    this.$wrapper.innerHTML = sorterForm;
    this.onChangeSorter();
    appendChild(this.$wrapper, this.$sorterFormWrapper);
  }
}
