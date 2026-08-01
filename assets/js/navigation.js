/* ==========================================================
   NAVIGATION.JS
   Fradesign Global
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initStickyHeader();
    initMobileNavigation();
});

/* ==========================================================
   STICKY HEADER
   ========================================================== */

function initStickyHeader() {
    const header = document.querySelector(".site-header");

    if (!header) {
        return;
    }

    const updateHeaderState = () => {
        header.classList.toggle("scrolled", window.scrollY > 12);
    };

    updateHeaderState();

    window.addEventListener(
        "scroll",
        updateHeaderState,
        {
            passive: true
        }
    );
}

/* ==========================================================
   MOBILE NAVIGATION
   ========================================================== */

function initMobileNavigation() {

    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".mobile-overlay");

    if (!burger || !menu) {
        return;
    }

    const links = menu.querySelectorAll("a");

    function openMenu() {

        menu.classList.add("open");

        if (overlay) {
            overlay.classList.add("open");
        }

        burger.setAttribute("aria-expanded", "true");

        document.body.style.overflow = "hidden";

    }

    function closeMenu() {

        menu.classList.remove("open");

        if (overlay) {
            overlay.classList.remove("open");
        }

        burger.setAttribute("aria-expanded", "false");

        document.body.style.overflow = "";

    }

    function toggleMenu() {

        if (menu.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }

    }

    burger.setAttribute("aria-expanded", "false");

    burger.addEventListener("click", toggleMenu);

    if (overlay) {
        overlay.addEventListener("click", closeMenu);
    }

    links.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 1024) {
            closeMenu();
        }

    });

}

/* ==========================================================
   ACTIVE NAVIGATION
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(
        '.nav a[href^="#"]'
    );

    if (!sections.length || !navLinks.length) {
        return;
    }

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const id = entry.target.getAttribute("id");

                navLinks.forEach((link) => {

                    const active =
                        link.getAttribute("href") === `#${id}`;

                    link.classList.toggle("active", active);

                });

            });

        },

        {
            threshold: 0.35
        }

    );

    sections.forEach((section) => {
        observer.observe(section);
    });

});

/* ==========================================================
   HEADER SHADOW
   ========================================================== */

window.addEventListener(

    "scroll",

    () => {

        const header = document.querySelector(".site-header");

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    },

    {
        passive: true
    }

);