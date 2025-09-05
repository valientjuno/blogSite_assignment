document.addEventListener("DOMContentLoaded", function () {
  const allButtons = document.querySelectorAll(".searchBTN");
  const searchBar = document.querySelectorAll(".searchBar");
  const searchInput = document.getElementById("searchInput");
  const searchClose = document.getElementById("searchClose");
});

for (var i = 0; i < allButtons.length; i++) {
  allBUttons[i].addEventListener("click", function () {
    searchBar.style.visibility = "visible";
    searchBar.classList.add("open");
    this.setAttribute("aria-expanded", "true");
    searchInput.focus();
  });
}

searchClose.addEventListener("click", function () {
  searchBar.style.visibility = "hidden";
  searchBar.classList.remove("open");
  this.setAttribute("aria-expanded, false");
});
