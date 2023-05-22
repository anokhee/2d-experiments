class Polygon {
  constructor(size, numSides, color) {
    this.size = size;
    this.numSides = numSides;
    this.color = color;
    this.guiParams = {
      size: {
        type: "slider",
        label: "Size",
      },
      numSides: {
        type: "slider",
        label: "Sides",
      },
      color: {
        type: "color-picker",
        label: "Color",
      },
    };
  }

  make(x, y) {
    stroke(1);
    fill(this.color);
    let angle = TWO_PI / this.numSides;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * this.size;
      let sy = y + sin(a) * this.size;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}
