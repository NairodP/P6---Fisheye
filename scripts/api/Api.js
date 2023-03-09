import photographerFactory from "../factories/photographer.js";

class Api {
  constructor(type) {
    this.url = "data/photographers.json";
    this.type = type;
    this.cache = [];
  }

  async get() {
    // Fetch and return the JSON File
    const cachedResult = this.cache.find((elt) => elt.key === this.type);
    if (cachedResult) {
      return cachedResult;
    }

    const response = await fetch(this.url);

    if (response.status == 200) {
      let json = await response.json();
      json = this.type == "photographers" ? json.photographers : null;
      const data = {
        key: this.type,
        data: [...json],
      };
      this.cache.push(data);
      return data;
    }
    throw new Error(response.status);
  }
}

export class PhotographerApi extends Api {
  // Avec l'ID on récup le bon photographe
  async getOnePhotographer(id) {
    const result = await this.get();
    console.log(result);
    result.type = "photographer";
    const photographer = await photographerFactory(result, id);

    return photographer;
  }

  // Récup tous les photographes
  async getAllPhotographers() {
    const result = await this.get();
    console.log(result);
    result.type = "photographers";
    const photographers = await photographerFactory(result, 0);

    return photographers;
  }
}
