const toggleAnimation = document.getElementById("toggle-animation");
const svgWrapper = document.querySelector(".svg-wrapper");

// Control Animation State with a Class
toggleAnimation.addEventListener("click", () => {
  svgWrapper.classList.toggle("active");
});
