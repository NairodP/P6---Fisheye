// utilisé dans les deux pages

export default class PhotographerCard {
  constructor(photographer) {
    this.name = photographer.name;
    this.id = photographer.id;
    this.picture = photographer.picture;
    this.location = photographer.location;
    this.tagline = photographer.tagline;
    this.price = photographer.price;
    this.index = photographer.index;
    this.photographerInfos = document.createElement("article");
    this.photographerPictureContent = document.createElement("div");
    this.photographerLikesContent = document.createElement("div");
  }

  getPhotographerPicture() {
    // Photo // Entête Photographer Page
    const img = `<img src="${this.picture}" alt="Photo du photographe ${this.name}" aria-label="Photo du photographe ${this.name}"> `;
    this.photographerPictureContent.innerHTML = img;

    return this.photographerPictureContent;
  }

  getPhotographerInfo() {
    // Info // Entête Photographer Page
    const article = `<h2>${this.name}</h2>
                    <div>
                      <h3>${this.location}</h3>
                      <div>${this.tagline}</div>
                    </div>`;
    this.photographerInfos.innerHTML = article;
    return this.photographerInfos;
  }

  getPhotographerCard() {
    // Card complète // Home page
    const article = `<a href="photographer.html?id=${this.id}" title="Aller à la page du photographe ${this.name}" aria-label="${this.name}">
                      <img src="${this.picture}" alt="Aller à la page du photographe ${this.name}">
                      <h2>${this.name}</h2>
                    </a>
                    <div>
                      <h3 >${this.location}</h3>
                      <span class="tagline">${this.tagline}</span>
                      <span class="price">${this.price}€/jour</span>
                    </div>`;
    this.photographerInfos.innerHTML = article;
    return this.photographerInfos;
  }

  getPhotographerLikes(likes) {
    // return photographer info
    const like = `<div>
                    <span class="totalLikes" aria-label="likes">${likes}</span>
                    <i class="fa-solid fa-heart" style="color: #black;"></i>
                  </div>
                  <span aria-label="tarif">${this.price} € / jour</span>`;
    this.photographerLikesContent.innerHTML = like;
    return this.photographerLikesContent;
  }
}
