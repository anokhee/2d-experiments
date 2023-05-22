function test(x, y) {
  let div = createElement("div");
  div.style("width", "100px");
  div.style("height", "100px");
  div.style("border", "1px solid black");
  div.position(x, y);
}
