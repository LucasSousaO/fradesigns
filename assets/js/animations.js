/* ==========================================================
   ANIMATIONS.JS
   Fradesign Global
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initRevealAnimations();
    initStaggerAnimations();
    initHoverAnimations();
});

/* ==========================================================
   REVEAL ANIMATIONS
   ========================================================== */

function initRevealAnimations() {

    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) {
        return;
    }

    const observer = new IntersectionObserver(

        (entries, currentObserver) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("in");

                currentObserver.unobserve(entry.target);

            });

        },

        {
            threshold: 0.15,
            rootMargin: "0px 0px -60px 0px"
        }

    );

    elements.forEach((element) => {

        observer.observe(element);

    });

}

/* ==========================================================
   STAGGER ANIMATIONS
   ========================================================== */

function initStaggerAnimations() {

    const groups = document.querySelectorAll(".stagger");

    if (!groups.length) {
        return;
    }

    const observer = new IntersectionObserver(

        (entries, currentObserver) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("in");

                currentObserver.unobserve(entry.target);

            });

        },

        {
            threshold: 0.12
        }

    );

    groups.forEach((group) => {

        observer.observe(group);

    });

}

/* ==========================================================
   HOVER EFFECTS
   ========================================================== */

function initHoverAnimations() {

    const cards = document.querySelectorAll(
        ".card, .service-card, .work-item, .case-card"
    );

    cards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.classList.add("hovering");

        });

        card.addEventListener("mouseleave", () => {

            card.classList.remove("hovering");

        });

    });

}

/* ==========================================================
   PARALLAX HERO
   ========================================================== */

const heroImage = document.querySelector(".hero-image");

if (heroImage) {

    window.addEventListener(

        "scroll",

        () => {

            const offset = window.scrollY * 0.08;

            heroImage.style.transform =
                `translateY(${offset}px)`;

        },

        {
            passive: true
        }

    );

}

/* ==========================================================
   COUNTER ANIMATION
   ========================================================== */

const counters = document.querySelectorAll("[data-counter]");

if (counters.length) {

    const counterObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: .5
        }

    );

    counters.forEach((counter) => {

        counterObserver.observe(counter);

    });

}

function animateCounter(element) {

    const target = Number(
        element.dataset.counter
    );

    const duration = 1500;

    const start = performance.now();

    function update(timestamp) {

        const progress = Math.min(
            (timestamp - start) / duration,
            1
        );

        const value = Math.floor(
            progress * target
        );

        element.textContent = value;

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}

/* ==========================================================
   REDUCED MOTION
   ========================================================== */

if (
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    document
        .querySelectorAll(".reveal,.stagger")
        .forEach((element) => {

            element.classList.add("in");

        });

}