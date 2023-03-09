export default class PhotographerCard {
  constructor(photographer) {
    const { name, id, picture, location, tagline, price } = photographer;

    this.name = name;
    this.id = id;
    this.picture = picture;
    this.location = location;
    this.tagline = tagline;
    this.price = price;

    this.$wrapperArticle = document.createElement("article");
    this.$wrapperPic = document.createElement("div");
  }

  getPhotographerPicture() {
    // Photo
    const img = `<img src="${this.picture}" alt="Photo du photographe ${this.name}" aria-label="Photo du photographe ${this.name}"> `;
    this.$wrapperPic.innerHTML = img;

    return this.$wrapperPic;
  }

  getPhotographerInfo() {
    // Info
    const article = `<h2>${this.name}</h2>
                      <div><h3>${this.location}</h3>
                      <div>${this.tagline}</div><div>`;
    this.$wrapperArticle.innerHTML = article;

    return this.$wrapperArticle;
  }

  getPhotographerCard() {
    // Card complète
    const article = `<a href="photographer.html?id=${this.id}" title="Aller à la page du photographe ${this.name}" aria-label="${this.name}">
      <img src="${this.picture}" alt="Aller à la page du photographe ${this.name}">
      <h2>${this.name}</h2>
    </a>
    <div>
      <h3 >${this.location}</h3>
      <div>${this.tagline}</div>
      <span>${this.price}€/jour</span>
    </div>`;
    this.$wrapperArticle.innerHTML = article;

    return this.$wrapperArticle;
  }
}
