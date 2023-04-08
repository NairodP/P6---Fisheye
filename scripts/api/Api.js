// utilisé dans les 2 pages d'affichages

import photographerFactory from "../factories/photographer.js";
import mediaFactory from "../factories/media.js";

// requête fetch sur un fichier JSON et stocker les données dans un cache. La propriété url contient l'URL du fichier JSON, la propriété type indique le type de données que l'on veut récupérer ("photographers" ou "media"), et la propriété cache stocke les résultats de la requête
class Api {
  constructor(type) {
    this.url = "data/photographers.json";
    this.type = type;
    this.cache = [];
  }

  async get() {
    // Fetch et retourne le ficher JSON
    const cachedResult = this.cache.find((elt) => elt.key === this.type);
    if (cachedResult) {
      return cachedResult;
    }

    const response = await fetch(this.url);

    if (response.status == 200) {
      let json = await response.json();
      json = this.type == "photographers" ? json.photographers : json.media;
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

export class MediaApi extends Api {
  // Récupère tous les médias à partir d'un id et filtre pour le mettre dans un nouveau tableau (medias)
  async getMediaOfPhotographer(id) {
    let getMedia = await this.get();
    getMedia = await getMedia.data.filter(
      (media) => media.photographerId == id
    );
    const medias = await getMedia.map((media) => mediaFactory(media));

    return medias;
  }
}
