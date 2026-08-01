/* ==========================================================
   LANGUAGE.JS
   Fradesign Global
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initLanguagePreference();
    initLanguageLinks();
});

/* ==========================================================
   CONFIGURATION
   ========================================================== */

const LANGUAGE_STORAGE_KEY = "fradesign-language";

const LANGUAGE_PAGES = {
    pt: "pt.html",
    en: "en.html"
};

/* ==========================================================
   INITIAL LANGUAGE PREFERENCE
   ========================================================== */

function initLanguagePreference() {
    const currentLanguage = document.documentElement.lang
        .toLowerCase()
        .startsWith("en")
        ? "en"
        : "pt";

    localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);

    updateLanguageControls(currentLanguage);
}

/* ==========================================================
   LANGUAGE LINKS
   ========================================================== */

function initLanguageLinks() {
    const languageControls = document.querySelectorAll("[data-lang]");

    languageControls.forEach((control) => {
        control.addEventListener("click", (event) => {
            const selectedLanguage = control.dataset.lang;

            if (!LANGUAGE_PAGES[selectedLanguage]) {
                return;
            }

            event.preventDefault();

            localStorage.setItem(
                LANGUAGE_STORAGE_KEY,
                selectedLanguage
            );

            window.location.href =
                LANGUAGE_PAGES[selectedLanguage];
        });
    });
}

/* ==========================================================
   UPDATE CONTROLS
   ========================================================== */

function updateLanguageControls(currentLanguage) {
    const languageControls = document.querySelectorAll("[data-lang]");

    languageControls.forEach((control) => {
        const isActive =
            control.dataset.lang === currentLanguage;

        control.classList.toggle("active", isActive);

        control.setAttribute(
            "aria-pressed",
            String(isActive)
        );

        if (isActive) {
            control.setAttribute("aria-current", "page");
        } else {
            control.removeAttribute("aria-current");
        }
    });
}