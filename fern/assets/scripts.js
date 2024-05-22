// Onload remove the class 'primary' from the #fern-header button[aria-haspopup="menu"]
document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector(
    '#fern-header button[aria-haspopup="menu"]'
  );
  button.classList.remove("primary");
  alert("Hello, World!");
});
