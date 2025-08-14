const buttons = document.querySelectorAll(".ripple");

function getClickPosition(e, element) {
  const x = e.clientX;
  const y = e.clientY;
  const buttonTop = element.offsetTop;
  const buttonLeft = element.offsetLeft;
  return {
    xInside: x - buttonLeft,
    yInside: y - buttonTop,
  };
}

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const { xInside, yInside } = getClickPosition(e, this);
    const circle = document.createElement("span");
    circle.classList.add("circle");
    circle.style.top = yInside + "px";
    circle.style.left = xInside + "px";
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 500);
  });
});
