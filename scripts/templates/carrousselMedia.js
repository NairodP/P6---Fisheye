export default class carrousselMedia {
  constructor(media) {
    const { id, title, link, type, position } = media;
    this.id = id;
    this.title = title;
    this.mediaType = type;
    this.mediaLink = link;
    this.position = position;

    // Create Carousel Element
    this.$wrapperMedia = document.createElement("li");
    this.$wrapperMedia.setAttribute("data-name", `item-${position}`);
    this.$wrapperMedia.setAttribute("class", "carousel-item");
    this.modalMedia = document.querySelector(".carousel");
  }

  MediaRender() {
    let box = "";
    if (this.mediaType === "ImageMedia") {
      box = `<img src="${this.mediaLink}" alt="${this.title}" title="Photo de ${this.title}">`;
    } else if (this.mediaType === "VideoMedia") {
      box = `<video class="player" controls title="Video de ${this.title}" >
                      <source src="${this.mediaLink}" type="video/mp4" />
                      <span class="sr-only" aria-live="polite">Lire la Video</span>
                  </video>`;
    }
    box += `<h3 class="item-title">${this.title}</h3>`;

    this.$wrapperMedia.innerHTML = box;
    this.modalMedia.appendChild(this.$wrapperMedia);

    // Expose player so it can be used from the console
    const player = new Plyr("video");
    window.player = player;
  }
}
