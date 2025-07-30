// Refactor the Initialization Logic
function init() {
  setupSlider();
  setupMenu();
}

function setupSlider() {
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
    slide.addEventListener("click", () => handleSlideClick(index));
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
  // Add Keyboard Navigation
  document.addEventListener("keydown", keyScroll);
  // Add Touch Navigation
  document.addEventListener("touchstart", handleTouchStart);
  document.addEventListener("touchmove", handleTouchMove);

  function handleSlideClick(index) {
    if (isAnimating) return;
    updateActiveDot(index);
    nextSlide(index);
    scrollSlide = index;
  }

  function navigateSlides(direction) {
    if (direction === "next") {
      scrollSlide++;
      if (scrollSlide > 2) {
        scrollSlide = 0;
      }
    } else if (direction === "prev") {
      scrollSlide--;
      if (scrollSlide < 0) {
        scrollSlide = 2;
      }
    }
    updateActiveDot(scrollSlide);
    nextSlide(scrollSlide);
  }

  function scrollChange(e) {
    if (isAnimating) return;
    const direction = e.deltaY > 0 ? "next" : "prev";
    navigateSlides(direction);
  }

  function keyScroll(e) {
    if (isAnimating) return;
    if (e.key === "ArrowDown") {
      navigateSlides("next");
    } else if (e.key === "ArrowUp") {
      navigateSlides("prev");
    }
  }

  function handleTouchStart(e) {
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchMove(e) {
    if (isAnimating) return;
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    // prevent accidental swipes by using a threshold
    if (Math.abs(deltaY) > 50) {
      const direction = deltaY > 0 ? "next" : "prev";
      navigateSlides(direction);
      // reset start position to prevent multiple triggers per swipe
      touchStartY = touchEndY;
    }
  }
}

function setupMenu() {
  const hamburger = document.querySelector(".menu");
  const navOpen = document.querySelector(".nav-open");

  const menuTl = gsap.timeline({ paused: true, reversed: true });
  menuTl
    .to(navOpen, { duration: 0.5, y: 0 })
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

  // Improve Menu Accessibility
  const toggleMenu = () => {
    if (menuTl.reversed()) {
      menuTl.play();
      hamburger.setAttribute("aria-expanded", "true");
      menuTl.eventCallback("onComplete", () => {
        navOpen.focus();
      });
    } else {
      menuTl.reverse();
      hamburger.setAttribute("aria-expanded", "false");
      menuTl.eventCallback("onReverseComplete", () => {
        hamburger.focus();
      });
    }
  };

  hamburger.addEventListener("click", toggleMenu);

  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });

  navOpen.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      toggleMenu();
    }
  });
}

init();
