(function () {
  "use strict";

  var CONFIG = window.CONTACT_FORM_CONFIG || {
    recipientEmail: "azayrth1319@gmail.com",
    rateLimitMs: 60000,
    formsubmitEndpoint: "https://formsubmit.co/ajax/",
  };

  var RATE_LIMIT_KEY = "celestial_contact_last_submit";
  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    populateTrackingFields(form);
    form.addEventListener("submit", handleSubmit);
  }

  function populateTrackingFields(form) {
    var entryPage = form.querySelector("#entry_page");
    var referralSource = form.querySelector("#referral_source");
    var landingPage = form.querySelector("#landing_page");

    if (entryPage) {
      entryPage.value = sessionStorage.getItem("entry_page") || window.location.href;
    }
    if (referralSource) {
      referralSource.value = sessionStorage.getItem("referral_source") || "";
    }
    if (landingPage) {
      landingPage.value = window.location.href;
    }
  }

  function validateForm(form) {
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var phone = form.phone.value.trim();
    var message = form.message.value.trim();
    var selectedServices = getSelectedServices(form);

    clearFieldErrors(form);

    var hasError = false;

    if (!name) {
      setFieldError(form.name, "Please enter your name.");
      hasError = true;
    }

    if (!email) {
      setFieldError(form.email, "Please enter your email address.");
      hasError = true;
    } else if (!EMAIL_REGEX.test(email)) {
      setFieldError(form.email, "Please enter a valid email address.");
      hasError = true;
    }

    if (!phone) {
      setFieldError(form.phone, "Please enter your phone number.");
      hasError = true;
    }

    if (selectedServices.length === 0) {
      setFieldError(form.services, "Please select at least one service.");
      hasError = true;
    }

    if (!message) {
      setFieldError(form.message, "Please enter a message.");
      hasError = true;
    }

    if (hasError) {
      return "Please fix the highlighted fields and try again.";
    }

    return null;
  }

  function getSelectedServices(form) {
    return Array.from(form.services.selectedOptions).map(function (option) {
      return option.text;
    });
  }

  function setFieldError(field, message) {
    field.setAttribute("aria-invalid", "true");
    field.classList.add("border-red-400", "focus:border-red-500", "focus:ring-red-500/20");

    var errorId = field.id + "-error";
    var existing = document.getElementById(errorId);
    if (existing) existing.remove();

    var errorEl = document.createElement("p");
    errorEl.id = errorId;
    errorEl.className = "field-error text-sm text-red-600 mt-1";
    errorEl.textContent = message;
    field.parentNode.appendChild(errorEl);
  }

  function clearFieldErrors(form) {
    form.querySelectorAll("[aria-invalid='true']").forEach(function (field) {
      field.removeAttribute("aria-invalid");
      field.classList.remove("border-red-400", "focus:border-red-500", "focus:ring-red-500/20");
    });
    form.querySelectorAll(".field-error").forEach(function (el) {
      el.remove();
    });
  }

  function isHoneypotFilled(form) {
    var honeypot = form.querySelector('input[name="_honey"]');
    return honeypot && honeypot.value.trim() !== "";
  }

  function checkRateLimit() {
    var lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
    if (!lastSubmit) return null;

    var elapsed = Date.now() - parseInt(lastSubmit, 10);
    if (elapsed < CONFIG.rateLimitMs) {
      var remaining = Math.ceil((CONFIG.rateLimitMs - elapsed) / 1000);
      return "Please wait " + remaining + " second(s) before submitting again.";
    }

    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    var form = event.target;
    var feedbackEl = document.getElementById("form-feedback");
    var submitBtn = document.getElementById("submit-button");

    clearFeedback(feedbackEl);
    clearFieldErrors(form);

    if (isHoneypotFilled(form)) {
      showSuccess(feedbackEl, form);
      return;
    }

    var rateLimitError = checkRateLimit();
    if (rateLimitError) {
      showError(feedbackEl, rateLimitError);
      return;
    }

    var validationError = validateForm(form);
    if (validationError) {
      showError(feedbackEl, validationError);
      return;
    }

    setLoading(submitBtn, true);

    try {
      var payload = buildPayload(form);
      var endpoint =
        CONFIG.formsubmitEndpoint + encodeURIComponent(CONFIG.recipientEmail);

      var response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      var data = {};
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Non-JSON response from FormSubmit", parseError);
      }

      if (response.ok && data.success === "true") {
        localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
        showSuccess(feedbackEl, form);
        return;
      }

      var errorMessage =
        data.message ||
        "Failed to send your message. Please try again or email us directly.";

      showError(feedbackEl, errorMessage);
    } catch (error) {
      console.error("Contact form submission error:", error);
      showError(
        feedbackEl,
        "Unable to send your message. Please check your connection and try again."
      );
    } finally {
      setLoading(submitBtn, false);
    }
  }

  function buildPayload(form) {
    var selectedServices = getSelectedServices(form);

    return {
      _subject: "New Contact Form Submission - Celestial Studios",
      _template: "table",
      _captcha: "false",
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      website: form.website.value.trim() || "Not provided",
      services: selectedServices.join(", "),
      message: form.message.value.trim(),
      submitted_at: new Date().toISOString(),
      entry_page: form.entry_page ? form.entry_page.value : "",
      referral_source: form.referral_source ? form.referral_source.value : "",
      landing_page: form.landing_page ? form.landing_page.value : "",
    };
  }

  function setLoading(button, loading) {
    if (!button) return;
    button.disabled = loading;
    button.textContent = loading ? "Sending..." : "Send Message";
    button.setAttribute("aria-busy", loading ? "true" : "false");
  }

  function showSuccess(feedbackEl, form) {
    if (feedbackEl) {
      feedbackEl.textContent =
        "Thank you! Your message has been sent successfully. We'll get back to you within 24–48 hours.";
      feedbackEl.className = "success-message";
      feedbackEl.setAttribute("role", "status");
      feedbackEl.hidden = false;
      feedbackEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    form.reset();
    clearFieldErrors(form);
    populateTrackingFields(form);
  }

  function showError(feedbackEl, message) {
    if (feedbackEl) {
      feedbackEl.textContent = message;
      feedbackEl.className = "error-message";
      feedbackEl.setAttribute("role", "alert");
      feedbackEl.hidden = false;
      feedbackEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function clearFeedback(feedbackEl) {
    if (!feedbackEl) return;
    feedbackEl.textContent = "";
    feedbackEl.className = "form-feedback";
    feedbackEl.hidden = true;
    feedbackEl.removeAttribute("role");
  }
})();
