let numStacked = 10;
let spacing = 20;

let shapesArr = [];
let numShapes = 8;

let doubleClickDelay = 150; // Time window to consider a double-click in milliseconds
let lastClickTime = 0;

function setup() {
  let startingPos = windowWidth / 2 - spacing * (numStacked * 0.5);
  createCanvas(windowWidth, windowHeight, SVG);
  for (let i = 0; i < numShapes; i++) {
    const x = startingPos + i * spacing;
    const y = windowHeight / 2;
    const draggable = new Draggable(x, y, 50, 50, "polygon");
    shapesArr.push(draggable);
  }
}

function draw() {
  background(255);
  shapesArr.forEach((draggable) => {
    draggable.over();
    draggable.update();
    draggable.show();
  });
}

function mousePressed() {
  shapesArr.forEach((draggable) => {
    draggable.pressed();
  });

  if (millis() - lastClickTime < doubleClickDelay) {
    doubleClicked();
  }
  lastClickTime = millis();
}

function mouseReleased() {
  shapesArr.forEach((draggable) => {
    draggable.released();
  });
}

function doubleClicked() {
  shapesArr.forEach((draggable) => {
    draggable.doubleClicked();
  });
}

function keyPressed() {
  if (key === "s") {
    save("artwork.svg");
  }
}
