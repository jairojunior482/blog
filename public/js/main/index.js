const alert = document.querySelector(".alert");
const loader = document.querySelector(".loader-container");

if (alert) {
  setTimeout(() => {
    alert.style.display = "none"
  }, 3000);
}

function onload() {
  setTimeout(() => {
    loader.style.opacity = "0";
  }, 100);
  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
}