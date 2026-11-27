// Premium portfolio interactions — vanilla JavaScript
const body = document.body;
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const typedText = document.getElementById("typedText");
const toTop = document.getElementById("toTop");

// Theme preference
let savedTheme = "dark";
try { savedTheme = localStorage.getItem("omkar-portfolio-theme") || "dark"; } catch (error) {}
if (savedTheme === "light") body.classList.add("light-theme");
function updateThemeButton() {
  const light = body.classList.contains("light-theme");
  themeBtn.textContent = light ? "☾" : "☼";
  themeBtn.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
}
updateThemeButton();
themeBtn.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  const theme = body.classList.contains("light-theme") ? "light" : "dark";
  try { localStorage.setItem("omkar-portfolio-theme", theme); } catch (error) {}
  updateThemeButton();
});

// Mobile navigation
menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.classList.toggle("active", isOpen);
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});
document.addEventListener("click", event => {
  if (!navLinks.contains(event.target) && !menuBtn.contains(event.target)) {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// Typing headline
const roles = ["Front-end Developer", "Creative Problem Solver", "Continuous Learner"];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reducedMotion) {
  typedText.textContent = roles[0];
} else {
  let roleIndex = 0, charIndex = 0, deleting = false;
  function typeRole() {
    const current = roles[roleIndex];
    typedText.textContent = current.slice(0, charIndex);
    if (!deleting && charIndex < current.length) {
      charIndex++;
      setTimeout(typeRole, 85);
    } else if (!deleting) {
      deleting = true;
      setTimeout(typeRole, 1400);
    } else if (charIndex > 0) {
      charIndex--;
      setTimeout(typeRole, 38);
    } else {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 350);
    }
  }
  typeRole();
}

// Reveal sections on scroll
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// Back-to-top visibility
function handleScroll() {
  toTop.classList.toggle("show", window.scrollY > 500);
}
window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));

// Contact form: opens the visitor's email app; no backend required.
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const bodyText = encodeURIComponent(`Hi Omkar,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
  document.getElementById("formNote").textContent = "Opening your email app…";
  window.location.href = `mailto:gikwadomkar98@gmail.com?subject=${subject}&body=${bodyText}`;
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();
