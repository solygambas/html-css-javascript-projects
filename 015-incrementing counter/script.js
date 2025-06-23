const counters = document.querySelectorAll(".counter");

counters.forEach((counter, index) => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    // Control the Animation Speed
    const increment = target / 500;
    if (count < target) {
      counter.innerText = `${Math.ceil(count + increment)}`;
      setTimeout(updateCounter, 1);
    } else counter.innerText = target;
  };

  // Make Counters Animate Sequentially
  setTimeout(updateCounter, index * 2500);
});
