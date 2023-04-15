// utilisé dans factories/media

// permet d'obtenir les informations d'une publication (stockée dans asset/media) qui vont notamment servir pour le filtre de tri.
// 2 Classes enfants permettant de retourner les chemins d'accès lorsque le media est une video ou une image

class Media {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }

  getId() {
    return this.id;
  }

  getPhotographerId() {
    return this.photographerId;
  }

  getTitle() {
    return this.title;
  }

  getLikes() {
    return this.likes;
  }

  getDate() {
    return this.date;
  }

  getPrice() {
    return this.price;
  }

  getPhotographerFolderName(name) {
    if (name) {
      let folderName = name.split(" ")[0];
      if (folderName.includes("-")) {
        folderName = folderName.replace("-", "");
      }
      return folderName;
    }
    return false;
  }

  getSource(photographerName, media) {
    if (photographerName) {
      const folderName = this.getPhotographerFolderName(photographerName);
      return `assets/media/${folderName}/${media}`;
    }
    return false;
  }
}

// Image Media
export class ImageMedia extends Media {
  constructor(data) {
    super(data);
    this._image = data.image;
  }

  // get image link
  getImage(photographerName) {
    return this.getSource(photographerName, this._image);
  }
}

// Video Media
export class VideoMedia extends Media {
  constructor(data) {
    super(data);
    this._video = data.video;
  }

  // get video link
  getVideo(photographerName) {
    return this.getSource(photographerName, this._video);
  }
}