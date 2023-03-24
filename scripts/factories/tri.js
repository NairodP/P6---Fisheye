export default class triApi {
  static async sorter(data, orderBy) {
    const error = "Critère de tri inconnu";
    return new Promise((resolve) => {
      setTimeout(() => {
        // permet de mettre la fonction asynchrone dans la file d'attente des taches a effectuer de manière différe
        const result = {
          key: orderBy, // critère de tri
          // data = tableau d'objets à tirer
          data: Array.from(data).sort((a, b) => {
            // sort compare une paire d'élements. envoie 1 si premier el + grans que le second, 0 si els egaux, -1 si premier el + petit que le second. lorsque sort envoi un nombre positif (1) les els sont intervertis
            switch (orderBy) {
              case "POP": {
                // tri par popularité
                return b.likes - a.likes;
              }
              case "DATE": {
                // par date de publi
                if (a.date > b.date) {
                  return -1;
                }
                if (b.date > a.date) {
                  return 1;
                }
                return 0;
              }
              case "TITRE": {
                // par titre (ordre alphabétique)
                if (a.title > b.title) {
                  return 1;
                }
                if (b.title > a.title) {
                  return -1;
                }
                return 0;
              }
              default:
                throw error;
            }
          }),
        };
        resolve(result); // clé de tri et tab
      }, 0);
    });
  }
}
