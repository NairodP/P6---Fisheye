// utilisé dans api/Api

// créé une instance de classe de media en fonction de si le media est une image ou une video.
// Le type du media est alors ajouté

import * as Media from "../models/media.js";

export default function mediaFactory(media) {
  if (media) {
    // Vérifie si media est une image ou une video avec une ternaire
    const med = media.image ? new Media.ImageMedia(media) : new Media.VideoMedia(media);
    med.type = media.image ? "ImageMedia" : "VideoMedia";
    return med;
  }
  throw new Error("No media");
}
