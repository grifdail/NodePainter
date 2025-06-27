import { P5CanvasInstance } from "@p5-wrapper/react";
import { Graphics, Image } from "p5";
import { CanvasTexture, Texture, TextureLoader } from "three";

type FakeCanvas = { elt: HTMLCanvasElement; width: number; height: number };

export class ImageData {
  pixels: number[] | null = null;
  p5Graphics: Graphics | null = null;
  p5Images: Image | null = null;
  canvas: FakeCanvas | null = null;
  url: string | null = null;
  threeTexture: Texture | null = null;
  loadingP5: boolean = false;
  loadingThree: TextureLoader | null = null;

  constructor(option: { url: string } | { p5Graphics: Graphics } | { canvas: FakeCanvas }) {
    if ("url" in option) {
      this.url = option.url;
    }
    if ("p5Graphics" in option) {
      this.p5Graphics = option.p5Graphics;
    }
    if ("canvas" in option) {
      this.canvas = option.canvas;
    }
  }

  set(img: Image | Graphics | HTMLCanvasElement) {}

  getP5(p5: P5CanvasInstance) {
    if (this.p5Graphics) {
      return this.p5Graphics;
    }
    if (this.p5Images) {
      return this.p5Images;
    }
    if (this.canvas) {
      this.p5Graphics = p5.createGraphics(this.canvas.width, this.canvas.height);
      this.p5Graphics.elt = this.canvas.elt;
      return this.p5Graphics;
    }

    if (this.url && !this.loadingP5) {
      this.loadingP5 = true;
      p5.loadImage(
        this.url,
        (img) => {
          this.p5Images = img;
          this.loadingP5 = false;
        },
        (err) => {
          console.error(err);
        }
      );
    }
    return null;
  }

  getThreeJs() {
    if (this.threeTexture) {
      if ("isCanvasTexture" in this.threeTexture && (this.p5Graphics || this.canvas)) {
        this.threeTexture.needsUpdate = true;
      }
      return this.threeTexture;
    }
    if (this.p5Graphics) {
      this.threeTexture = new CanvasTexture(this.p5Graphics.elt);
      return this.threeTexture;
    }
    if (this.p5Images) {
      this.threeTexture = new CanvasTexture((this.p5Images as any).canvas);
      return this.threeTexture;
    }
    if (this.canvas) {
      this.threeTexture = new CanvasTexture(this.canvas.elt);

      return this.threeTexture;
    }
    if (this.url && !this.loadingThree) {
      this.loadingThree = new TextureLoader();
      this.loadingThree.load(this.url, (texture: Texture) => {
        this.threeTexture = texture;
        this.loadingThree = null;
      });
    }
    return null;
  }
}
