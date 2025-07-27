const sectionGrid = document.getElementById("section-grid");

// Disable Parallax on Mobile
if (window.innerWidth >= 768) {
  new Rellax(".rellax", {
    callback: function (position) {
      if (position.y < window.innerHeight / 1.4) {
        // Create a "Reveal on Scroll" Effect
        sectionGrid.classList.add("is-visible");
      }
    },
  });

  // Add a Horizontal Parallax Effect
  new Rellax(".rellax-horizontal", {
    horizontal: true,
    wrapper: "#horizontal-section",
  });
}
