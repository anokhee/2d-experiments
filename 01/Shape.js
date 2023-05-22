class Shape {
  constructor(type, size, scale) {
    this.type = type;
    this.size = size;
    this.scale = scale;
  }

  make() {
    this.size = this.size * this.scale;
    switch (this.type) {
      case "flower":
        return new Flower(20, this.size, 5, "lightblue", "lightyellow");
      case "polygon":
        return new Polygon(this.size, 5, "lightgreen");
      case "star":
        return new Star(this.size, this.size * 0.5, 5, "yellow");
    }
  }
}
