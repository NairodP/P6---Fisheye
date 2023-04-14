import {
  clickSimulation,
  querySelector,
  appendChild,
  setAttribute,
} from "../utils/genRaccourci.js";

import { openCarousel } from "../utils/carouselAcces.js";

export default class MediaCard {
  constructor(media) {
    const { id, title, likes, date, price, link, type, position } = media;
    this.id = id;
    this.title = title;
    this.likes = likes;
    this.date = date;
    this.price = price;
    this.type = type;
    this.link = link;
    this.position = position;
    // console.log(position);
    this.mediaContent = document.createElement("article");
    this.mediaSection = querySelector(".photograph_media");
  }

  eventsOnMedia() {
    const media = this.mediaContent;
    const likes = querySelector(".likes", media);
    const icone = querySelector("i", media);
    let card;

    if (this.type === "ImageMedia") {
      card = querySelector("img", media);
    } else if (this.type === "VideoMedia") {
      card = querySelector(".playMask", media);
    }

    // Event d'une card au carousel
    card.addEventListener("click", () => {
      const item = querySelector(`li[data-name="item-${this.position}"]`);
      this.type === "ImageMedia"
        ? setAttribute("active-item", item)
        : setAttribute("active-item-video", item);
      openCarousel();
      querySelector("#close").focus();
    });
    clickSimulation(card);

    // Gestionnaire des likes
    icone.addEventListener("click", () => {
      const totalLikes = querySelector(".totalLikes");
      if (this.likes == likes.textContent) {
        likes.textContent = parseInt(likes.textContent) + 1;
        totalLikes.textContent = parseInt(totalLikes.textContent) + 1;
        icone.classList.add("active-heart");
      } else {
        likes.textContent = parseInt(likes.textContent) - 1;
        totalLikes.textContent = parseInt(totalLikes.textContent) - 1;
        icone.classList.remove("active-heart");
      }
    });
    clickSimulation(icone);
  }

  // Rendu d'une card
  mediaCard() {
    let media = "";
    const index = this.position + 4;
    if (this.type === "ImageMedia") {
      media = `<img src="${this.link}" alt="${this.title}, closeup view" aria-label="Photo de ${this.title}"  tabindex="${index}"> `;
    } else if (this.type === "VideoMedia") {
      media = `<video class="player" aria-hidden="true" tabindex="1">
                <source src="${this.link}" type="video/mp4" />
              </video>
              <div class="playMask" tabindex="${index}">
                <span class="sr-only" aria-live="polite">Lire la Video, ${this.title}</span>
              </div>`;
    }

    media += `<div>
                <h3>${this.title}</h3>
                <i class="fa-solid fa-heart" tabindex=${index}>
                  <span class="likes">${this.likes}</span> 
                </i>
              </div>`;

    this.mediaContent.innerHTML = media;
    this.eventsOnMedia();
    appendChild(this.mediaContent, this.mediaSection);

    const player = new Plyr("video");
    // console.log(player);
    window.player = player;
  }
}
