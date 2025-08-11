const labels = document.querySelectorAll(".form-control label");

function createWaveLabel(text) {
  return text
    .split("")
    .map(
      (letter, idx) =>
        `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
    )
    .join("");
}

labels.forEach((label) => {
  label.innerHTML = createWaveLabel(label.innerText);
});
