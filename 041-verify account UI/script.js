const codes = document.querySelectorAll(".code");
const title = document.getElementById("title");

codes[0].focus();

// Auto-Submit on Completion
const verifyAccount = () => {
  codes.forEach((input) => (input.disabled = true));
  title.textContent = "Verifying...";
  setTimeout(() => {
    title.textContent = "Account Verified!";
  }, 1000);
};

// Handle Pasted Codes
codes[0].addEventListener("paste", (e) => {
  e.preventDefault();
  const pasteData = e.clipboardData.getData("text");
  codes.forEach((code, index) => {
    if (pasteData[index]) {
      code.value = pasteData[index];
    }
  });
  setTimeout(() => {
    [...codes].every((code) => code.value)
      ? verifyAccount()
      : codes[codes.length - 1].focus();
  }, 10);
});

codes.forEach((code, index) => {
  code.addEventListener("keydown", (e) => {
    if (e.key >= 0 && e.key <= 9) {
      codes[index].value = "";
      setTimeout(() => {
        index === codes.length - 1 ? verifyAccount() : codes[index + 1].focus();
      }, 10);
    } else if (e.key === "Backspace") {
      setTimeout(() => {
        codes[index - 1]?.focus();
      }, 10);
      // Add Visual Feedback for Invalid Input
    } else {
      e.target.classList.add("shake");
      setTimeout(() => {
        e.target.classList.remove("shake");
      }, 500);
    }
  });
});
