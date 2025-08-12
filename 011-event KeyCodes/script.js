const insert = document.getElementById("insert");

window.addEventListener("keydown", (event) => {
  // Add a Visual Key Press Effect
  document.body.classList.add("active");
  setTimeout(() => document.body.classList.remove("active"), 100);
  // Update the Spacebar Label
  // Show More Keyboard Event Details
  insert.innerHTML = `
    <div class="key">
        ${event.key === " " ? "Spacebar" : event.key}
        <small>event.key</small>
      </div>
      <div class="key red">
        ${event.keyCode}
        <small>event.keyCode (old)</small>
      </div>
      <div class="key green">
        ${event.code}
        <small>event.code (new)</small>
      </div>
      <div class="key ${event.shiftKey ? "green" : "red"}">
        ${event.shiftKey}
        <small>event.shiftKey</small>
      </div>
      <div class="key ${event.ctrlKey ? "green" : "red"}">
        ${event.ctrlKey}
        <small>event.ctrlKey</small>
      </div>`;
});
