const controller = new ScrollMagic.Controller();
const tl = gsap.timeline();

tl.to(".rock", { duration: 10, y: -300 })
  .to(".girl", { duration: 10, y: -200 }, "-=10")
  .fromTo(".background", { y: -50 }, { duration: 10, y: 0 }, "-=10")
  .to(".content", { duration: 10, top: "0%" }, "-=10")
  .fromTo(".content-images", { opacity: 0 }, { duration: 3, opacity: 1 })
  .fromTo(".text", { opacity: 0 }, { duration: 3, opacity: 1 });

let scene = new ScrollMagic.Scene({
  triggerElement: "section",
  duration: "300%",
  triggerHook: 0,
})
  .setTween(tl)
  .setPin("section")
  .addTo(controller);
