const toggleButton = document.querySelector(".toggle");
const navigation = document.querySelector(".navigation");
const hiddenSections = document.querySelectorAll("section.hidden");
const contactForm = document.querySelector(".contact-form form");

// Improve Menu Accessibility
function updateMenuAria() {
  const isActive = navigation.classList.contains("active");
  toggleButton.setAttribute("aria-expanded", isActive);
  toggleButton.setAttribute(
    "aria-label",
    isActive ? "Close menu" : "Open menu"
  );
}

// Add Contact Form Validation
function validateContactForm(form) {
  let valid = true;
  const fields = form.querySelectorAll("input[required], textarea[required]");
  fields.forEach((field) => {
    field.classList.remove("contact-form__input--invalid");
    if (
      !field.value.trim() ||
      (field.type === "email" && !field.checkValidity())
    ) {
      field.classList.add("contact-form__input--invalid");
      valid = false;
    }
  });
  return valid;
}

toggleButton.addEventListener("click", () => {
  toggleButton.classList.toggle("active");
  navigation.classList.toggle("active");
  updateMenuAria();
});

navigation.addEventListener("click", () => {
  toggleButton.classList.toggle("active");
  navigation.classList.toggle("active");
  updateMenuAria();
});

// Animate Elements on Scroll
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("hidden");
      obs.unobserve(entry.target);
    }
  });
});

hiddenSections.forEach((section) => {
  observer.observe(section);
});

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateContactForm(contactForm)) {
    alert("Form submitted successfully!");
    contactForm.reset();
  }
});
