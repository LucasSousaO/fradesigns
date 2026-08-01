document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".work-tab");
  const items = document.querySelectorAll(".work-item");

  if (!tabs.length || !items.length) return;

  function filterGallery(filter) {
    items.forEach((item) => {
      const show =
        filter === "all" ||
        item.dataset.category === filter;

      item.hidden = !show;
      item.setAttribute("aria-hidden", String(!show));
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {

      tabs.forEach((button) => {
        button.classList.remove("is-active");
        button.setAttribute("aria-selected", "false");
      });

      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      filterGallery(tab.dataset.filter);
    });
  });

  // Estado inicial
  filterGallery("all");
});