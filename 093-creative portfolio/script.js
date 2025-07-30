function init() {
  // slider
  const slides = document.querySelectorAll(".slide");
  const pages = document.querySelectorAll(".page");
  const backgrounds = [
    `radial-gradient(#2B3760, #0B1023)`,
    `radial-gradient(#4E3022, #161616)`,
    `radial-gradient(#4E4342, #161616)`,
  ];
  let current = 0;
  let scrollSlide = 0;
  let isAnimating = false;

  function updateActiveDot(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  slides.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      if (isAnimating) return;
      updateActiveDot(index);
      nextSlide(index);
      scrollSlide = index;
    });
  });

  async function nextSlide(pageNumber) {
    if (isAnimating || pageNumber === current) return;
    isAnimating = true;

    const nextPage = pages[pageNumber];
    const currentPage = pages[current];
    const nextLeft = nextPage.querySelector(".hero .model-left");
    const nextRight = nextPage.querySelector(".hero .model-right");
    const currentLeft = currentPage.querySelector(".hero .model-left");
    const currentRight = currentPage.querySelector(".hero .model-right");
    const nextText = nextPage.querySelector(".details");
    const portfolio = document.querySelector(".portfolio");

    const tl = gsap.timeline({});
    tl.fromTo(currentLeft, { y: "-10%" }, { duration: 0.3, y: "-100%" })
      .fromTo(
        currentRight,
        { y: "10%" },
        { duration: 0.3, y: "-100%" },
        "-=0.2"
      )
      .to(portfolio, {
        duration: 0.3,
        backgroundImage: backgrounds[pageNumber],
      })
      .fromTo(
        currentPage,
        { opacity: 1 },
        { duration: 0.3, opacity: 0, pointerEvents: "none" }
      )
      .fromTo(
        nextPage,
        { opacity: 0, pointerEvents: "none" },
        { duration: 0.3, opacity: 1, pointerEvents: "all" },
        "-=0.6"
      )
      .fromTo(nextLeft, { y: "-100%" }, { duration: 0.3, y: "-10%" }, "-=0.6")
      .fromTo(nextRight, { y: "-100%" }, { duration: 0.3, y: "10%" }, "-=0.8")
      .fromTo(nextText, { opacity: 0, y: 0 }, { duration: 0.3, opacity: 1 })
      .set(nextLeft, { clearProps: "all" })
      .set(nextRight, { clearProps: "all" });

    await tl;

    current = pageNumber;
    isAnimating = false;
  }
  document.addEventListener("wheel", scrollChange);

  function scrollChange(e) {
    if (isAnimating) return;
    e.deltaY > 0 ? (scrollSlide += 1) : (scrollSlide -= 1);
    if (scrollSlide > 2) scrollSlide = 0;
    if (scrollSlide < 0) scrollSlide = 2;
    updateActiveDot(scrollSlide);
    nextSlide(scrollSlide);
  }

  //   menu
  const hamburger = document.querySelector(".menu");

  const menuTl = gsap.timeline({ paused: true, reversed: true });
  menuTl
    .to(".nav-open", { duration: 0.5, y: 0 })
    .fromTo(
      ".contact",
      { opacity: 0, y: 10 },
      { duration: 0.5, opacity: 1, y: 0 },
      "-=0.1"
    )
    .fromTo(
      ".social",
      { opacity: 0, y: 10 },
      { duration: 0.5, opacity: 1, y: 0 },
      "-=0.5"
    )
    .fromTo(
      ".logo",
      { color: "var(--white)" },
      { duration: 0.2, color: "black" },
      "-=1"
    )
    .fromTo(
      ".menu line",
      { stroke: "var(--white)" },
      { duration: 0.2, stroke: "black" },
      "-=1"
    );

  hamburger.addEventListener("click", () => {
    menuTl.reversed() ? menuTl.play() : menuTl.reverse();
  });
}

init();
