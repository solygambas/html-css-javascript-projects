const animatedElements = document.querySelectorAll("[data-offset]");
const content = document.querySelector(".content");
const pinSpacer = document.querySelector(".pin-spacer");

// Add Responsive Animation Adjustments
const isMobile = window.innerWidth < 768;
const offsetScale = isMobile ? 0.4 : 1;

// Fix Regressions
pinSpacer.style.height = `${content.offsetHeight - window.innerHeight}px`;

// Upgrade to GSAP ScrollTrigger
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: "section",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    pin: true,
  },
});

// Refactor Magic Numbers in JavaScript
animatedElements.forEach((element) => {
  const baseOffset = parseInt(element.dataset.offset, 10);
  const offset = -baseOffset * offsetScale;
  timeline.to(element, { duration: 10, y: offset }, "-=10");
});

timeline
  .fromTo(
    ".background",
    { y: isMobile ? -20 : -50 },
    { y: 0, duration: 10 },
    "-=10"
  )
  .to(".content", { duration: 10, top: "0%" }, "-=10")
  .fromTo(".content-images", { opacity: 0 }, { opacity: 1, duration: 3 })
  .fromTo(".text", { opacity: 0 }, { opacity: 1, duration: 3 });
