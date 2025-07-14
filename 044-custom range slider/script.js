const range = document.getElementById("range");
const resetButton = document.getElementById("reset");

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

// Create the updateSlider function
const updateSlider = (inputRange) => {
  const value = +inputRange.value;
  const label = inputRange.nextElementSibling;
  const rangeWidth = getComputedStyle(inputRange).getPropertyValue("width");
  const labelWidth = getComputedStyle(label).getPropertyValue("width");
  const numWidth = +rangeWidth.substring(0, rangeWidth.length - 2);
  const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2);
  const max = +inputRange.max;
  const min = +inputRange.min;
  const left =
    value * (numWidth / max) -
    numLabelWidth / 2 +
    scale(value, min, max, 10, -10);
  label.style.left = `${left}px`;
  label.innerHTML = value;
  // Dynamically Update Track Color
  const percent = ((value - min) / (max - min)) * 100;
  // Make the Track Color Lighter as the Slider Fills
  const lightness = 40 + percent * 0.4;
  const color = `hsl(216, 40%, ${lightness}%)`;
  inputRange.style.background = `linear-gradient(to right, ${color} ${percent}%, #d3d3d3 ${percent}%)`;
};

updateSlider(range);

range.addEventListener("input", (e) => updateSlider(e.target));

// Add a "Reset to Default" Button
resetButton.addEventListener("click", () => {
  range.value = 50;
  updateSlider(range);
});
