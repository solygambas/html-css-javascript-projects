const labels = document.querySelectorAll(".form-control label");

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, idx) =>
        // Adjust Wave Animation Speed
        `<span style="transition-delay:${idx * 25}ms">${letter}</span>`
    )
    .join("");
});
