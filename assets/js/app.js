/* ==========================================================
   APP.JS
   Fradesign Global
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initCurrentYear();
    initExternalLinks();
    initSmoothScroll();
});

/* ==========================================================
   CURRENT YEAR
   ========================================================== */

function initCurrentYear() {
    const yearElements = document.querySelectorAll("[data-current-year]");

    if (!yearElements.length) {
        return;
    }

    const currentYear = new Date().getFullYear();

    yearElements.forEach((element) => {
        element.textContent = currentYear;
    });
}

/* ==========================================================
   EXTERNAL LINKS
   ========================================================== */

function initExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');

    links.forEach((link) => {
        const linkUrl = new URL(link.href);
        const currentUrl = window.location.hostname;

        if (linkUrl.hostname !== currentUrl) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
    });
}

/* ==========================================================
   SMOOTH SCROLL
   ========================================================== */

function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector(".site-header");
            const headerHeight = header ? header.offsetHeight : 0;

            const targetPosition =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                16;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });
}