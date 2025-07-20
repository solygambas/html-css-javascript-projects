const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.closest(".form-control");
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input, message) {
  const formControl = input.closest(".form-control");
  formControl.className = "form-control success";
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputs) {
  let allFilled = true;
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      allFilled = false;
    }
  });
  return allFilled;
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkEmail(input) {
  // Reference: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input.value.trim()).toLowerCase())) showSuccess(input);
  else showError(input, `${getFieldName(input)} is not valid`);
}

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    // Improve Password Confirmation
    showError(input1, "Passwords do not match");
    showError(input2, "Passwords do not match");
  } else if (input1.value && input2.value) {
    showSuccess(input1);
    showSuccess(input2);
  }
}

function debounce(functionToDebounce, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => functionToDebounce.apply(this, args), delay);
  };
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkPasswordMatch(password, password2);
  // Refactor the checkRequired function
  if (checkRequired([username, email, password, password2])) {
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
  }
});

// Add a Show/Hide Password Toggle
document.querySelectorAll(".toggle-password").forEach((icon) => {
  icon.addEventListener("click", () => {
    const toggleId = icon.getAttribute("data-toggle");
    const input = document.getElementById(toggleId);
    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
});

// Implement Real-time Validation
username.addEventListener(
  "input",
  debounce(() => {
    if (checkRequired([username])) {
      checkLength(username, 3, 15);
    }
  })
);

email.addEventListener(
  "input",
  debounce(() => {
    if (checkRequired([email])) {
      checkEmail(email);
    }
  })
);

password.addEventListener(
  "input",
  debounce(() => {
    if (checkRequired([password])) {
      checkLength(password, 6, 25);
      checkPasswordMatch(password, password2);
    }
  })
);

password2.addEventListener(
  "input",
  debounce(() => {
    if (checkRequired([password2])) {
      checkPasswordMatch(password, password2);
    }
  })
);
