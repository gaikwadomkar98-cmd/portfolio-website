
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "Light mode" : "Dark mode";
});


const year = new Date().getFullYear();
document.getElementById("year").textContent = "© " + year + " Your Name";
