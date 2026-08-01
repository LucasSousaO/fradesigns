/* ==========================================================
   FORMS.JS
   Fradesign Global
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initForms();
});

/* ==========================================================
   FORM INITIALIZATION
   ========================================================== */

function initForms() {

    const forms = document.querySelectorAll(".form");

    if (!forms.length) {
        return;
    }

    forms.forEach((form) => {

        form.addEventListener("submit", handleSubmit);

        const fields = form.querySelectorAll(
            ".form-input, .form-textarea, .form-select"
        );

        fields.forEach((field) => {

            field.addEventListener("blur", () => {
                validateField(field);
            });

            field.addEventListener("input", () => {

                if (field.classList.contains("is-invalid")) {
                    validateField(field);
                }

            });

        });

    });

}

/* ==========================================================
   SUBMIT
   ========================================================== */

function handleSubmit(event) {

    event.preventDefault();

    const form = event.currentTarget;

    const fields = form.querySelectorAll(
        ".form-input, .form-textarea, .form-select"
    );

    let valid = true;

    fields.forEach((field) => {

        if (!validateField(field)) {
            valid = false;
        }

    });

    if (!valid) {

        showMessage(
            form,
            "Please review the highlighted fields.",
            "error"
        );

        const firstError = form.querySelector(".is-invalid");

        if (firstError) {
            firstError.focus();
        }

        return;

    }

    const button = form.querySelector(
        'button[type="submit"],input[type="submit"]'
    );

    if (button) {

        button.disabled = true;

        if (button.tagName === "BUTTON") {
            button.dataset.original = button.innerHTML;
            button.innerHTML = "Sending...";
        } else {
            button.dataset.original = button.value;
            button.value = "Sending...";
        }

    }

    /*
       Replace this section with your preferred service:
       Formspree
       Netlify Forms
       EmailJS
       Resend
       API endpoint
    */

    setTimeout(() => {

        showMessage(
            form,
            "Your message has been sent successfully.",
            "success"
        );

        form.reset();

        form.querySelectorAll(
            ".is-valid,.is-invalid"
        ).forEach((field) => {

            field.classList.remove(
                "is-valid",
                "is-invalid"
            );

        });

        if (button) {

            button.disabled = false;

            if (button.tagName === "BUTTON") {
                button.innerHTML = button.dataset.original;
            } else {
                button.value = button.dataset.original;
            }

        }

    }, 1200);

}

/* ==========================================================
   FIELD VALIDATION
   ========================================================== */

function validateField(field) {

    clearValidation(field);

    if (field.disabled) {
        return true;
    }

    const value = field.value.trim();

    if (field.required && value === "") {

        invalidate(
            field,
            "This field is required."
        );

        return false;

    }

    if (
        field.type === "email" &&
        value !== "" &&
        !isValidEmail(value)
    ) {

        invalidate(
            field,
            "Please enter a valid email."
        );

        return false;

    }

    const minLength = Number(
        field.getAttribute("minlength")
    );

    if (
        minLength &&
        value.length &&
        value.length < minLength
    ) {

        invalidate(
            field,
            `Minimum ${minLength} characters.`
        );

        return false;

    }

    field.classList.add("is-valid");

    return true;

}

/* ==========================================================
   INVALID FIELD
   ========================================================== */

function invalidate(field, message) {

    field.classList.add("is-invalid");

    field.setAttribute(
        "aria-invalid",
        "true"
    );

    const group = field.closest(".form-group");

    if (!group) {
        return;
    }

    let error = group.querySelector(".form-error");

    if (!error) {

        error = document.createElement("span");

        error.className = "form-error";

        group.appendChild(error);

    }

    error.textContent = message;

}

/* ==========================================================
   CLEAR VALIDATION
   ========================================================== */

function clearValidation(field) {

    field.classList.remove(
        "is-valid",
        "is-invalid"
    );

    field.removeAttribute("aria-invalid");

    const group = field.closest(".form-group");

    if (!group) {
        return;
    }

    const error = group.querySelector(".form-error");

    if (error) {
        error.remove();
    }

}

/* ==========================================================
   FORM MESSAGE
   ========================================================== */

function showMessage(form, text, type) {

    let message = form.querySelector(".form-message");

    if (!message) {

        message = document.createElement("div");

        message.className = "form-message";

        message.setAttribute(
            "role",
            "alert"
        );

        form.prepend(message);

    }

    message.className =
        `form-message form-message-${type}`;

    message.textContent = text;

}

/* ==========================================================
   EMAIL VALIDATION
   ========================================================== */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}