import { P5CanvasInstance } from "@p5-wrapper/react";
import { Graphics, Image } from "p5";

export class ImageData {
  isLoaded: boolean = false;
  image: Image | Graphics | null = null;
  pixels: number[] | null = null;

  load(url: string, p5: P5CanvasInstance) {
    if (!this.isLoaded) {
      p5.loadImage(url, (img) => {
        this.image = img;
        this.isLoaded = true;
      });
    }
  }

  set(img: Image | Graphics) {
    this.image = img;
    this.isLoaded = true;
  }
}
