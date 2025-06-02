export class BoundingBox {
  top: number = 0;
  right: number = 0;
  bottom: number = 0;
  left: number = 0;

  constructor(top: number = 0, right: number = 0, bottom: number = 0, left: number = 0) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  }
  clone() {
    return new BoundingBox(this.top, this.right, this.bottom, this.left);
  }

  extend(box: BoundingBox) {
    return new BoundingBox(Math.min(this.top, box.top), Math.max(this.right, box.right), Math.max(this.bottom, box.bottom), Math.min(this.left, box.left));
  }
  grow(top: number = 0, right: number = 0, bottom: number = 0, left: number = 0) {
    return new BoundingBox(this.top - top, this.right + right, this.bottom + bottom, this.left - left);
  }
  width() {
    return this.right - this.left;
  }
  height() {
    return this.bottom - this.top;
  }
  center(): [number, number] {
    return [(this.left + this.right) / 2, (this.top + this.bottom) / 2];
  }
}
