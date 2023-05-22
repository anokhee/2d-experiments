class Flower {
  constructor(size, petalSize, numPetals, petalColor, pistilColor) {
    this.size = size;
    this.numPetals = numPetals;
    this.petalSize = petalSize;
    this.petalColor = petalColor;
    this.pistilColor = pistilColor;
    this.guiParams = {
      size: {
        type: "slider",
        label: "Pistil Size",
      },
      numPetals: {
        type: "slider",
        label: "# Petals",
      },
      petalSize: {
        type: "slider",
        label: "Petal Size",
      },
      petalColor: {
        type: "color-picker",
        label: "Petal Color",
      },
      pistilColor: {
        type: "color-picker",
        label: "Pistil Color",
      },
    };
  }

  make(x, y) {
    const angleIncrement = TWO_PI / this.numPetals;
    fill(this.petalColor);
    stroke(1);
    beginShape();
    for (let i = 0; i < this.numPetals; i++) {
      const angle = i * angleIncrement;
      const petalAngle = angle - PI / this.numPetals;
      const x1 = x + this.size * cos(petalAngle);
      const y1 = y + this.size * sin(petalAngle);
      const x2 = x + this.petalSize * cos(petalAngle);
      const y2 = y + this.petalSize * sin(petalAngle);
      const x3 = x + this.petalSize * cos(angle + PI / this.numPetals);
      const y3 = y + this.petalSize * sin(angle + PI / this.numPetals);
      const x4 = x + this.size * cos(angle + PI / this.numPetals);
      const y4 = y + this.size * sin(angle + PI / this.numPetals);
      vertex(x1, y1);
      bezierVertex(x2, y2, x3, y3, x4, y4, x1, y1);
    }
    endShape();
    fill(this.pistilColor);
    ellipse(x, y, this.size, this.size);
  }
}
