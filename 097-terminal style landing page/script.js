const about = document.querySelector("#about");
const contact = document.querySelector("#contact");
const help = document.querySelector("#help");
const aboutContent = document.querySelector("#about-content");
const contactContent = document.querySelector("#contact-content");
const helpContent = document.querySelector("#help-content");

// Refactor Window Creation with a Factory Function
function handleFocus() {
  this.setBackground("var(--text-color)");
}

function handleBlur() {
  this.setBackground("#777");
}

function createWindow(title, mountContent, options = {}) {
  const defaultOptions = {
    width: "400px",
    height: "400px",
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
    onfocus: handleFocus,
    onblur: handleBlur,
  };
  return new WinBox({
    title,
    mount: mountContent,
    ...defaultOptions,
    ...options,
  });
}

about.addEventListener("click", () => {
  createWindow("About Me", aboutContent);
});

contact.addEventListener("click", () => {
  createWindow("Contact Me", contactContent, {
    top: 100,
    left: 150,
  });
});

// Add a "Help" Command
help.addEventListener("click", () => {
  createWindow("Help", helpContent, {
    top: 150,
    left: 250,
  });
});

// Implement a Typewriter Effect
document.addEventListener("DOMContentLoaded", () => {
  const heading = document.querySelector("h1");
  const text = heading.childNodes[0].textContent;
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      heading.childNodes[0].textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 200); // Adjust speed as needed
    }
  }

  heading.childNodes[0].textContent = "";
  typeWriter();
});
