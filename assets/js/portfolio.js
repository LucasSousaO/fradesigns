/* ==========================================================
   PORTFOLIO.JS
   Fradesign Global
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initPortfolioFilters();
    initPortfolioLightbox();
    initPortfolioLazyLoading();
});

/* ==========================================================
   FILTERS
   ========================================================== */

function initPortfolioFilters() {

    const filters = document.querySelectorAll(".portfolio-filter");
    const items = document.querySelectorAll(".work-item");

    if (!filters.length || !items.length) {
        return;
    }

    filters.forEach((filter) => {

        filter.addEventListener("click", () => {

            const category = filter.dataset.filter || "all";

            filters.forEach((button) => {

                button.classList.remove("active");
                button.setAttribute("aria-pressed", "false");

            });

            filter.classList.add("active");
            filter.setAttribute("aria-pressed", "true");

            items.forEach((item) => {

                const itemCategory = item.dataset.category || "";

                const visible =
                    category === "all" ||
                    itemCategory.split(",").includes(category);

                item.classList.toggle("is-hidden", !visible);

            });

        });

    });

}

/* ==========================================================
   LIGHTBOX
   ========================================================== */

function initPortfolioLightbox() {

    const items = document.querySelectorAll(".work-item img");

    if (!items.length) {
        return;
    }

    const overlay = document.createElement("div");

    overlay.className = "portfolio-lightbox";

    overlay.innerHTML = `
        <div class="portfolio-lightbox-content">
            <img src="" alt="">
        </div>
    `;

    document.body.appendChild(overlay);

    const image = overlay.querySelector("img");

    items.forEach((item) => {

        item.style.cursor = "zoom-in";

        item.addEventListener("click", () => {

            image.src = item.src;
            image.alt = item.alt;

            overlay.classList.add("open");

            document.body.style.overflow = "hidden";

        });

    });

    overlay.addEventListener("click", () => {

        overlay.classList.remove("open");

        document.body.style.overflow = "";

    });

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            overlay.classList.contains("open")
        ) {

            overlay.classList.remove("open");

            document.body.style.overflow = "";

        }

    });

}

/* ==========================================================
   LAZY LOADING
   ========================================================== */

function initPortfolioLazyLoading() {

    const images = document.querySelectorAll(".work-item img");

    images.forEach((image) => {

        image.loading = "lazy";
        image.decoding = "async";

    });

}

/* ==========================================================
   HOVER EFFECT
   ========================================================== */

document.querySelectorAll(".work-item").forEach((item) => {

    item.addEventListener("mouseenter", () => {

        item.classList.add("hover");

    });

    item.addEventListener("mouseleave", () => {

        item.classList.remove("hover");

    });

});

/* ==========================================================
   PRELOAD FIRST IMAGES
   ========================================================== */

window.addEventListener("load", () => {

    const firstImages = document.querySelectorAll(
        ".work-item img"
    );

    [...firstImages]
        .slice(0, 4)
        .forEach((img) => {

            const preload = new Image();

            preload.src = img.src;

        });

});



  document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".portfolio-filter");
    const portfolioCards = document.querySelectorAll(".portfolio-card");

    if (!filterButtons.length || !portfolioCards.length) {
      return;
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((item) => {
          const isSelected = item === button;

          item.classList.toggle("is-active", isSelected);
          item.setAttribute("aria-pressed", String(isSelected));
        });

        portfolioCards.forEach((card) => {
          const cardCategory = card.dataset.category;
          const shouldDisplay =
            selectedFilter === "all" || cardCategory === selectedFilter;

          card.hidden = !shouldDisplay;
        });
      });
    });
  });