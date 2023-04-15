// utilisé dans factories/photographer

// accès à toutes les données d'un phtographer grâçe à des methodes get.

export default class PhotographerInfo {
  constructor(photographer) {
    this._name = photographer.name;
    this._id = photographer.id;
    this._city = photographer.city;
    this._country = photographer.country;
    this._tagline = photographer.tagline;
    this._price = photographer.price;
    this._portrait = photographer.portrait;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get location() {
    return `${this._city}, ${this._country}`;
  }

  get tagline() {
    return this._tagline;
  }

  get price() {
    return this._price;
  }

  get picture() {
    return `assets/PhotographersID/${this._portrait}`;
  }
}