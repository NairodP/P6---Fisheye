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
        throw new Error('No type')
    }
}