const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("main-nav");

// Add a Hamburger Menu for Mobile
hamburger.addEventListener("click", function () {
  const isOpen = nav.classList.toggle("is-open");
  hamburger.setAttribute("aria-expanded", isOpen);
  hamburger.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

nav.addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    nav.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open navigation");
  }
});

// Animate Decorative Circles on Scroll
const setupParallaxAnimation = (sectionSelector, elementsConfig) => {
  const section = document.querySelector(sectionSelector);

  const elements = elementsConfig.map((config) => ({
    node: document.querySelector(config.selector),
    multiplier: config.multiplier,
    relative: config.relative, // Check if animation is relative to the section
  }));

  const handleScroll = () => {
    elements.forEach(({ node, multiplier, relative }) => {
      const scrollStart = relative ? section.offsetTop : 0;
      const scrollPosition = window.scrollY - scrollStart;
      node.style.transform = `translateY(${scrollPosition * multiplier}px)`;
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", handleScroll);
        } else {
          window.removeEventListener("scroll", handleScroll);
        }
      });
    },
    { threshold: 0.1 } // Trigger when 10% of the element is visible
  );

  observer.observe(section);
};

// Hero circles (animation starts from page top)
setupParallaxAnimation(".hero-section", [
  { selector: ".hero-circle-1", multiplier: 0.1, relative: false },
  { selector: ".hero-circle-2", multiplier: -0.15, relative: false },
  { selector: ".hero-circle-3", multiplier: 0.05, relative: false },
]);

// Join circles (animation starts when section is visible)
setupParallaxAnimation(".circles", [
  { selector: ".join-circle-1", multiplier: 0.1, relative: true },
]);
