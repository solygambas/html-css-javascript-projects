const insert = document.getElementById("insert");

window.addEventListener("keydown", (event) => {
  insert.innerHTML = `
    <div class="key">
        ${event.key === " " ? "Space" : event.key}
        <small>event.key</small>
      </div>
      <div class="key red">
        ${event.keyCode}
        <small>event.keyCode (old)</small>
      </div>
      <div class="key green">
        ${event.code}
        <small>event.code (new)</small>
      </div>`;
});
