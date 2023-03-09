import * as Api from '../api/Api.js'
import PhotographerCard from '../templates/PhotographerCard.js'

class HomePage {
    async displayIndexData(photographers) {
        if (photographers) {
            let index = 2
            photographers.forEach((photographer) => {
                photographer.index = index
                const card = new PhotographerCard(photographer)
                // Affiche infos des photographes
                document.querySelector('.photographer_section').appendChild(card.getPhotographerCard())
                index += 1
            })
        }
    }

    async init() {
        // Récup les données des photographes
        const photographers = await new Api.PhotographerApi('photographers').getAllPhotographers()
        this.displayIndexData(photographers)
    }
}

const page = new HomePage()
page.init()
