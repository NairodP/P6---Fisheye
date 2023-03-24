import triApi from "../factories/tri.js";

export default class ProxyTri {
  constructor() {
    this.cache = [];
  }

  async sorter(medias, sorter) {
    // On vérifie s'il n'y a pas déjà la data dans le cache
    const cachedResult = this.cache.find((elt) => elt.key === sorter);
    if (cachedResult) {
      return cachedResult;
    }

    // si pas de data, TriApi puis push de la data recup dans le cache pour un futur appel
    const data = await triApi.sorter(medias, sorter);
    this.cache.push(data);

    return data;
  }
}
