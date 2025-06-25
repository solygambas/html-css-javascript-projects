const fill = document.querySelector(".fill");
const empties = document.querySelectorAll(".empty");

const dragStart = function () {
  this.className += " hold";
  setTimeout(() => (this.className = "invisible"), 0);
};

const dragEnd = function () {
  this.className = "fill";
};

const dragOver = function (e) {
  // Ref: https://developer.cdn.mozilla.net/en-US/docs/Web/API/Document/dragover_event
  e.preventDefault();
};

const dragEnter = function (e) {
  e.preventDefault();
  this.className += " hovered";
};

const dragLeave = function () {
  this.className = "empty";
};

const dragDrop = function (e) {
  e.preventDefault();
  this.className = "empty";
  this.append(fill);
  // Handle Dropped Image Files
  const uploadedImage = e.dataTransfer.files[0];

  if (uploadedImage) {
    if (uploadedImage.type.startsWith("image/")) {
      fill.innerHTML = ``;
      const reader = new FileReader();
      reader.onload = () => {
        fill.style.backgroundImage = `url(${reader.result})`;
        fill.style.backgroundSize = "contain";
        fill.style.backgroundRepeat = "no-repeat";
        fill.style.backgroundPosition = "center";
      };
      reader.readAsDataURL(uploadedImage);
      // Handle PDF Files with an Icon
    } else if (uploadedImage.type === "application/pdf") {
      fill.style.backgroundImage = "none";
      fill.innerHTML = `
        <div class="pdf-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 48px; height: 48px; margin-bottom: 8px;">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#e74c3c" stroke-width="2" fill="#f8f9fa"/>
        <polyline points="14,2 14,8 20,8" stroke="#e74c3c" stroke-width="2" fill="none"/>
        <text x="12" y="16" text-anchor="middle" fill="#e74c3c" font-family="Arial" font-size="4" font-weight="bold">PDF</text>
          </svg>
          <div class="filename">${uploadedImage.name}</div>
        </div>`;
    } else {
      alert("Please upload a valid image or PDF file.");
    }
  }
};

fill.addEventListener("dragstart", dragStart);
fill.addEventListener("dragend", dragEnd);

for (const empty of empties) {
  empty.addEventListener("dragover", dragOver);
  empty.addEventListener("dragenter", dragEnter);
  empty.addEventListener("dragleave", dragLeave);
  empty.addEventListener("drop", dragDrop);
}
