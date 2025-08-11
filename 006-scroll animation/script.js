const boxes = document.querySelectorAll(".box");

const checkBoxes = () => {
  // Change When Boxes Appear on Scroll
  const triggerBottom = (window.innerHeight / 5) * 3.9;
  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) box.classList.add("show");
    else box.classList.remove("show");
  });
};

window.addEventListener("scroll", checkBoxes);
checkBoxes();
