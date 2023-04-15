export default class carouselMedia {
  constructor(media) {
    // destructuring pour extraire les propriétés de l'objet 'media'
    const { id, title, link, type, position } = media;
    // assigner les propriétés aux variables de l'instance de classe
    this.id = id;
    this.title = title;
    this.mediaType = type;
    this.mediaLink = link;
    this.position = position;
    this.carouselLi = document.createElement("li");
    this.carouselLi.setAttribute("data-name", `item-${position}`);
    this.carouselLi.setAttribute("class", "carousel-item");
    this.carouselDiv = document.querySelector(".carousel");
  }

  carouselMediaRender() {
    let card = "";
    // génére le code HTML en fonction du type de media
    if (this.mediaType === "ImageMedia") {
      card = `<img src="${this.mediaLink}" alt="${this.title}" title="Photo de ${this.title}">`;
    } else if (this.mediaType === "VideoMedia") {
      card = `<video class="player" controls title="Video de ${this.title}" >
                      <source src="${this.mediaLink}" type="video/mp4" />
                      <span class="sr-only" aria-live="polite">Lire la Video</span>
                  </video>`;
    }
    card += `<h3 class="item-title">${this.title}</h3>`;

    // lie le code html créé aux éléments du DOM
    this.carouselLi.innerHTML = card;
    this.carouselDiv.appendChild(this.carouselLi);

    // Plyr (importé depuis cdn) permet d'implémenter tout le gestionnaire de video
    const player = new Plyr("video");
  }
}
