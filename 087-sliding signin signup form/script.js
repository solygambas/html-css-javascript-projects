const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const signUpContainer = document.getElementById("sign-up-container");
const signInContainer = document.getElementById("sign-in-container");
const togglePasswordIcons = document.querySelectorAll(
  ".form-container__toggle-password i"
);

function togglePanel(isSignUp) {
  container.classList.toggle("right-panel-active", isSignUp);
  // Improve Accessibility with ARIA
  signUpContainer.setAttribute("aria-hidden", (!isSignUp).toString());
  signInContainer.setAttribute("aria-hidden", isSignUp.toString());
}

// Implement Password Visibility Toggle
function togglePasswordVisibility(icon) {
  const input = icon.parentElement.previousElementSibling;
  input.type = input.type === "password" ? "text" : "password";
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
}

signUpButton.addEventListener("click", () => togglePanel(true));
signInButton.addEventListener("click", () => togglePanel(false));

togglePasswordIcons.forEach((icon) => {
  icon.addEventListener("click", () => togglePasswordVisibility(icon));
});
