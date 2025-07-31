// Add a Lightbox to the Gallery

const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.showModal();
  });
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.close();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.close();
});
