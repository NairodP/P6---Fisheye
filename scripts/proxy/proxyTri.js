// utilisé dans components/triForm

// ajoute une couche de cache pour stocker les résultats du tri précédent afin de ne pas avoir à effectuer une nouvelle requête de tri si les données sont les mêmes
// méthode sorter recherche d'abord si les données sont présentes dans le cache. Si oui, retourne les données triées à partir du cache. Sinon, appelle la méthode sortData de la class TriApi pour trier les données, stocke le résultat dans le cache et retourne les données triées.
// réduit le nbr de requètes et est donc bénéfique pour les perfs du site

import triApi from "../factories/tri.js";

export default class ProxyTri {
  constructor() {
    this.cache = [];
  }

  async trieur(medias, sorter) {
    // On vérifie s'il n'y a pas déjà la data dans le cache
    const cachedResult = this.cache.find((elt) => elt.key === sorter);
    if (cachedResult) {
      return cachedResult;
    }

    // si pas de data, TriApi puis push de la data recup dans le cache pour un futur appel
    const data = await triApi.sortData(medias, sorter);
    this.cache.push(data);

    return data;
  }
}
