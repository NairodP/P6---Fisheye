// utilisé dans ProxyTri/tri

// Class prenant 2 params : data = tableau de données à trier, orderBy = critère de tri
// objet "result" créé avec une clé "key" contenant la valeur de "orderBy" et "data" contenant le tableau de données trié

export default class TriApi {
  static async sortData(data, orderBy) {
    const errorMessage = 'Unknown sorting criteria';

    return new Promise((resolve) => {
        // set Timeout permet de mettre la fonction asynchrone dans la file d'attente des taches a effectuer de manière différée.
        // permet de libérer le thread principal et de ne pas bloquer l'interface utilisateur pendant que le tri est en cours
      setTimeout(() => {
        const result = {
          key: orderBy,
          // sort compare une paire d'élements. envoie 1 si premier el + grans que le second, 0 si els egaux, -1 si premier el + petit que le second. lorsque sort envoi un nombre positif (1) les els sont intervertis
          data: Array.from(data).sort((a, b) => {
            switch (orderBy) {
              case 'POPULARITE':
                return b.likes - a.likes;
              case 'DATE':
                return a.date > b.date ? -1 : b.date > a.date ? 1 : 0;
              case 'TITRE':
                return a.title > b.title ? 1 : b.title > a.title ? -1 : 0;
              default:
                throw errorMessage;
            }
          }),
        };
        resolve(result); // clé de tri et tab
      }, 0);
    });
  }
}