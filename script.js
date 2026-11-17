// Romantic little interactions for Vidhya's website.
(function () {
  const expectedDate = "06/08/2026";
  const protectedPages = ["welcome.html", "bouquet.html", "memories.html", "her.html", "us.html", "chaos.html", "letter.html", "forever.html"];
  const page = location.pathname.split("/").pop() || "index.html";

  if (protectedPages.includes(page) && sessionStorage.getItem("vidhyaUnlocked") !== "yes") {
    location.replace("index.html");
    return;
  }

  const form = document.getElementById("date-form");
  if (form) {
    const input = document.getElementById("anniversary");
    const error = document.getElementById("gate-error");
    input.addEventListener("input", () => {
      let digits = input.value.replace(/\D/g, "").slice(0, 8);
      if (digits.length > 4) digits = digits.slice(0,2) + "/" + digits.slice(2,4) + "/" + digits.slice(4);
      else if (digits.length > 2) digits = digits.slice(0,2) + "/" + digits.slice(2);
      input.value = digits;
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (value === expectedDate) {
        sessionStorage.setItem("vidhyaUnlocked", "yes");
        location.href = "welcome.html";
      } else {
        error.textContent = "Hmm… try the date that started our forever. ♡";
        input.value = "";
        input.focus();
      }
    });
  }

  document.querySelectorAll(".menu-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const nav = document.querySelector(".nav");
      const open = nav.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
      button.textContent = open ? "×" : "☰";
    });
  });

  const reveal = document.getElementById("reveal-flower");
  if (reveal) reveal.addEventListener("click", () => {
    const note = document.getElementById("flower-note");
    note.hidden = !note.hidden;
    reveal.textContent = note.hidden ? "Open your tiny flower note ♡" : "Close your flower note ♡";
  });
})();