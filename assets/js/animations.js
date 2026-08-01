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

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-hero-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll("[data-slide]")];
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const dotsContainer = carousel.querySelector("[data-carousel-dots]");
    const status = carousel.querySelector("[data-carousel-status]");

    if (slides.length < 2) return;

    let currentIndex = 0;
    let autoplayTimer = null;
    const autoplayDelay = 5000;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero-carousel__dot";
      dot.setAttribute("aria-label", `Exibir projeto ${index + 1}`);
      dot.addEventListener("click", () => {
        showSlide(index);
        restartAutoplay();
      });
      dotsContainer.appendChild(dot);
      return dot;
    });

    function showSlide(index) {
      currentIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === currentIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });

      status.textContent = `Projeto ${currentIndex + 1} de ${slides.length}`;
    }

    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    function previousSlide() {
      showSlide(currentIndex - 1);
    }

    function stopAutoplay() {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }

    function startAutoplay() {
      if (prefersReducedMotion || document.hidden) return;
      stopAutoplay();
      autoplayTimer = window.setInterval(nextSlide, autoplayDelay);
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    prevButton.addEventListener("click", () => {
      previousSlide();
      restartAutoplay();
    });

    nextButton.addEventListener("click", () => {
      nextSlide();
      restartAutoplay();
    });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);

    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        previousSlide();
        restartAutoplay();
      }

      if (event.key === "ArrowRight") {
        nextSlide();
        restartAutoplay();
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    let touchStartX = 0;

    carousel.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.changedTouches[0].clientX;
      },
      { passive: true }
    );

    carousel.addEventListener(
      "touchend",
      (event) => {
        const distance = event.changedTouches[0].clientX - touchStartX;

        if (Math.abs(distance) > 50) {
          distance > 0 ? previousSlide() : nextSlide();
          restartAutoplay();
        }
      },
      { passive: true }
    );

    showSlide(0);
    startAutoplay();
  });
});
