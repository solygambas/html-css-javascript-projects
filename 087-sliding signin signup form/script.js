// const signUpButton = document.getElementById("signUp");
// const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");


// This is the first method #1
/* signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
*/

// This is the other method.
container.addEventListener("click", () => {
  container.classList.toggle("right-panel-active");
});


