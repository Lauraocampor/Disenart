// HAMBURGER SCRIPT
document.getElementById("hamburgerButton").addEventListener("click", () => {
  document.getElementById("hamburgerList").classList.toggle("about-nav-toggler");
}, false);

// OPEN SEARCH SCRIPT
document.getElementById("searchButton").addEventListener("click", () => {
  document.getElementById("searchModal").classList.toggle("searchToggle");
}, false);

document.getElementById("searchButton").addEventListener("click", () => {
  document.getElementById("searchModalBox").classList.toggle("searchToggleBox");
}, false);

// CLOSE SEARCH SCRIPT
document.getElementById("escapeButton").addEventListener("click", () => {
  document.getElementById("searchModal").classList.toggle("searchToggle");
}, false);

document.getElementById("escapeButton").addEventListener("click", () => {
  document.getElementById("searchModalBox").classList.toggle("searchToggleBox");
}, false);