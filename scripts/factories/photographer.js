// utilisé dans api/Api

// créé des instances de la classe PhotographerInfo en fonction des datas renvoyées par l'API.
// 2 params : result contient les datas renvoyées par l'API, et id l'ID du photographe à récupérer uniquement si le type est "photographer" sinon pas utilisé.

import PhotographerInfo from "../models/photographer.js";

export default function photographerFactory(result, id) {
    // Selon le type choisit on récup la data d'un photographe ou tous les photographes
    switch (result.type) {
    case 'photographer': {
        // data d'un photographe récup grâçe à son ID
        const photographerData = result.data.filter((photographer) => photographer.id == id)
        return new PhotographerInfo(photographerData[0])
    }
    case 'photographers': {
        // Récup de tous les photographes
        return result.data.map((photographer) => new PhotographerInfo(photographer))
    }
    default:
        throw new Error('Pas de type (photographer ou photographers)')
    }
}