shapesArr = [];

class Draggable {
  constructor(x, y, w, h, shapeType) {
    this.dragging = false;
    this.rollover = false;
    this.scale = 1;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.shapeType = shapeType;
    this.shape = new Shape(this.shapeType, w, this.scale).make();
    this.offsetX = 0;
    this.offsetY = 0;

    this.gui = createElement("div").addClass("gui");
    this.guiControlsContainer = createElement("div");
    this.updateGUIPosition();
  }

  makeGUI() {
    this.shapeSelector = createSelect();
    this.shapeSelector.addClass("shape-selector").value(this.shapeType);
    ["polygon", "star", "flower"].forEach((option) => {
      this.shapeSelector.option(option);
    });

    this.shapeSelector.changed(() => {
      this.guiControlsContainer.html("");
      this.shapeType = this.shapeSelector.value();
      this.shape = new Shape(
        this.shapeSelector.value(),
        this.w,
        this.scale
      ).make();
      this.createShapeGUI();
    });

    this.gui.child(this.shapeSelector).child(this.guiControlsContainer);
    this.createShapeGUI();
  }

  createShapeGUI() {
    let duplicateButton = createButton("duplicate");
    duplicateButton.addClass("gui-button");

    let deleteButton = createButton("delete");
    deleteButton.addClass("gui-button destructive");

    this.guiControlsContainer.html("");
    Object.keys(this.shape).forEach((param) => {
      if (
        param !== "boundingBoxSize" &&
        this.shape.guiParams[param] &&
        typeof this.shape[param] === "number"
      ) {
        const sliderContainer = createDiv().addClass("slider-container");
        const sliderLabel = createP(this.shape.guiParams[param].label).addClass(
          "gui-label"
        );
        const slider = createSlider(0, 50, this.shape[param]).addClass(
          "slider"
        );

        slider.input(() => {
          this.updateShape(param, slider.value());
        });

        sliderContainer.child(sliderLabel).child(slider);
        this.guiControlsContainer.child(sliderContainer);
      } else if (param !== "boundingBoxSize" && this.shape.guiParams[param]) {
        const colorPickerContainer = createDiv().addClass(
          "color-picker-container"
        );
        const colorPickerLabel = createP(
          this.shape.guiParams[param].label
        ).addClass("gui-label");
        const colorPicker = createColorPicker(this.shape[param]).addClass(
          "colorPicker"
        );

        colorPicker.input(() => {
          this.updateShape(param, colorPicker.value());
        });

        colorPickerContainer.child(colorPickerLabel).child(colorPicker);
        this.guiControlsContainer.child(colorPickerContainer);
      }
      this.guiControlsContainer.child(duplicateButton);
      this.guiControlsContainer.child(deleteButton);

      duplicateButton.mousePressed(() => {
        this.duplicateShape();
      });

      deleteButton.mousePressed(() => {
        this.deleteShape();
      });
    });
  }

  updateShape(param, value) {
    this.shape[param] = value;
    this.updateGUIPosition();
  }

  deleteShape() {
    const index = shapesArr.indexOf(this);
    if (index !== -1) {
      shapesArr.splice(index, 1);
      this.gui.remove(); // Remove the GUI element from the DOM
    }
  }

  updateGUIPosition() {
    this.gui.position(this.x + 100, this.y - 50);
  }

  show() {
    if (this.dragging || this.rollover) {
      drawingContext.setLineDash([5, 5]);
      drawingContext.strokeStyle = "rgba(255, 0, 255, 100)";
    } else {
      drawingContext.strokeStyle = "rgba(0, 0, 0, 100)";
      drawingContext.setLineDash([0, 0]);
      noFill();
    }

    this.shape.make(this.x + this.w * 0.5, this.y + this.h * 0.5, this.scale);
  }

  doubleClicked() {
    if (this.gui.style("display") === "block") {
      this.gui.style("display", "none");
    }

    if (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    ) {
      this.gui.style("display", "block");
      if (!this.gui.child()[0]) {
        this.makeGUI();
      }
    }
  }

  createCookieCutterShape() {
    const path = new Path2D();
    const offsetX = 10;
    const offsetY = 10;

    path.rect(
      this.x - offsetX,
      this.y - offsetY,
      this.w + offsetX * 2,
      this.h + offsetY * 2
    );

    const cookieCutterShape = new Shape("polygon", this.w, 1);
    cookieCutterShape.customPath = path;

    // Set the stroke color and thickness
    cookieCutterShape.strokeColor = "black";
    cookieCutterShape.strokeWeight = 10;

    // Push the new shape to the shapesArr
    shapesArr.push(
      new Draggable(
        this.x,
        this.y,
        this.w + offsetX * 2,
        this.h + offsetY * 2,
        "polygon"
      )
    );
  }

  duplicateShape() {
    const duplicatedShape = new Draggable(
      this.x + 10,
      this.y - 10,
      this.w,
      this.h,
      this.shapeType
    );

    Object.assign(duplicatedShape.shape, this.shape);
    shapesArr.push(duplicatedShape);
  }

  over() {
    this.rollover =
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h;
  }

  update() {
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
      this.updateGUIPosition();
    }
  }

  pressed() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    ) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    this.dragging = false;
  }
}
