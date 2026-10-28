// 1) Dark / Light theme (remembers your choice)
const themeBtn = document.getElementById("themeBtn");

function applyTheme(mode) {
  document.body.classList.toggle("light", mode === "light");
  themeBtn.textContent = mode === "light" ? "Dark" : "Light";
}
let saved = "dark";
try { saved = localStorage.getItem("theme") || "dark"; } catch (e) {}
applyTheme(saved);

themeBtn.addEventListener("click", function () {
  const next = document.body.classList.contains("light") ? "dark" : "light";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// 2) Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", function () {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", function (e) {
  if (e.target.tagName === "A") navLinks.classList.remove("open");
});

// 3) Typing effect for the role line
const roles = ["Front-end Developer", "Problem Solver", "Fast Learner"];
const typed = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let roleIndex = 0, charIndex = 0, deleting = false;

function type() {
  const word = roles[roleIndex];
  charIndex += deleting ? -1 : 1;
  typed.textContent = word.slice(0, charIndex);

  let delay = deleting ? 40 : 90;
  if (!deleting && charIndex === word.length) { deleting = true; delay = 1400; }
  else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 300; }
  setTimeout(type, delay);
}
if (reduceMotion) { typed.textContent = roles[0]; } else { type(); }

// 4) Sections fade in when you scroll to them
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add("show"); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(function (el) { observer.observe(el); });
} else {
  revealItems.forEach(function (el) { el.classList.add("show"); });
}

// 5) Footer year
document.getElementById("year").textContent = "© " + new Date().getFullYear() + " Omkar Gaikwad";