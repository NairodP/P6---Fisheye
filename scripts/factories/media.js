import * as Media from "../models/media.js";

export default function mediaFactory(media) {
  if (media) {
    // Vérifie si media est une image ou une video avec une ternaire
    const med = media.image ? new Media.ImageM(media) : new Media.VideoM(media);
    med.type = media.image ? "ImageM" : "VideoM";
    return med;
  }
  throw new Error("No media");
}
