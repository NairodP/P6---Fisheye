import {
  querySelector,
  appendChild,
  classListToggle,
  setAttribute,
} from "../utils/shortcutDom.js";

const body = document.querySelector("body");
const main = document.querySelector("#main");

function onModal(target) {
  main.style.display = main.style.display === "none" ? "block" : "none";
  classListToggle("no-scroll", body);
  target.toggleAttribute("aria-hidden");
  target.style.display = target.style.display === "none" ? "block" : "none";
}

const trapFocus = (modal) => {
  const focusableElements = Array.from(
    modal.querySelectorAll(
      'button[type=submit], i[tabindex="1"], img[id="closeModal"], input, textarea, li[class="active-item"], [tabindex]:not([tabindex="-1"])'
    )
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];
  document.addEventListener("keydown", (e) => {
    const isTabPressed = e.key === "Tab" || e.code === "9";
    if (!isTabPressed) {
      return;
    }
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      e.preventDefault();
    }
  });
  firstFocusableElement.focus();
};
const lightboxModal = querySelector(".lightbox_modal");
const onOpenLightboxModal = () => {
  onModal(lightboxModal);
  trapFocus(lightboxModal);
};
const onEnterClick = (target) => {
  target.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.target.click();
      event.preventDefault();
    }
  });
};
// *************

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

    // Dom el
    this.$wrapperMedia = document.createElement("article");
    this.wrapperMedia = querySelector(".photograph_media");
  }

  // Events handler
  mediaEventsHandler() {
    // DOM $Wrapper
    const media = this.$wrapperMedia;
    const likes = querySelector(".likes", media);
    const icone = querySelector("i", media);
    let box;

    // Buttons
    if (this.type === "ImageM") {
      box = querySelector("img", media);
    } else if (this.type === "VideoM") {
      box = querySelector(".playMask", media);
    }

    // EVENTS
    box.addEventListener("click", () => {
      const item = querySelector(`li[data-name="item-${this.position}"]`);
      this.type === "ImageM"
        ? setAttribute("active-item", item)
        : setAttribute("active-item-video", item);
      onOpenLightboxModal();
      querySelector("#close").focus();
    });
    onEnterClick(box);

    // Likes
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
    onEnterClick(icone);
  }

  getMediaCardDOM() {
    // Generate the media cards
    let media = "";
    const index = this.position + 4;
    if (this.type === "ImageM") {
      media = `<img src="${this.link}" alt="${this.title}, closeup view" aria-label="Photo de ${this.title}"  tabindex="${index}"> `;
    } else if (this.type === "VideoM") {
      media = `<video class="player" aria-hidden="true" tabindex="-1">
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

    this.$wrapperMedia.innerHTML = media;
    this.mediaEventsHandler();
    appendChild(this.$wrapperMedia, this.wrapperMedia);

    const player = new Plyr("video");
    window.player = player;
  }
}
