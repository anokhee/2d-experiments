class Star {
  constructor(size, innerSize, numSides, color) {
    this.size = size;
    this.innerSize = innerSize;
    this.numSides = numSides;
    this.color = color;
    this.guiParams = {
      size: {
        type: "slider",
        label: "Outer Corner",
      },
      innerSize: {
        type: "slider",
        label: "Inner Corner",
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
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * this.innerSize;
      let sy = y + sin(a) * this.innerSize;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * this.size;
      sy = y + sin(a + halfAngle) * this.size;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}
