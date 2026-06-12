(function () {
  "use strict";

  var progressBar = document.getElementById("reading-progress");
  var backToTop = document.getElementById("back-to-top");
  var tocToggle = document.querySelector(".article-toc__toggle");
  var tocPanel = document.getElementById("article-toc-panel");
  var tocLinks = document.querySelectorAll("[data-toc-link]");
  var headings = [];

  tocLinks.forEach(function (link) {
    var href = link.getAttribute("href");
    if (href && href.charAt(0) === "#") {
      var el = document.getElementById(href.slice(1));
      if (el) headings.push({ el: el, link: link });
    }
  });

  if (tocToggle && tocPanel) {
    var isDesktop = function () {
      return window.matchMedia("(min-width: 1024px)").matches;
    };

    tocToggle.addEventListener("click", function () {
      var expanded = tocToggle.getAttribute("aria-expanded") === "true";
      tocToggle.setAttribute("aria-expanded", expanded ? "false" : "true");
      tocPanel.classList.toggle("is-open", !expanded);
    });

    if (isDesktop()) {
      tocPanel.classList.add("is-open");
      tocToggle.setAttribute("aria-expanded", "true");
    }

    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (e) {
      if (e.matches) {
        tocPanel.classList.add("is-open");
        tocToggle.setAttribute("aria-expanded", "true");
      } else {
        tocPanel.classList.remove("is-open");
        tocToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  tocLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;

      var target = document.getElementById(href.slice(1));
      if (!target) return;

      e.preventDefault();
      var offset = 112;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: "smooth" });

      if (tocPanel && !window.matchMedia("(min-width: 1024px)").matches) {
        tocPanel.classList.remove("is-open");
        if (tocToggle) tocToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  function onScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = progress + "%";
    }

    if (backToTop) {
      if (scrollTop > 400) {
        backToTop.classList.add("is-visible");
      } else {
        backToTop.classList.remove("is-visible");
      }
    }

    var current = null;
    headings.forEach(function (item) {
      if (item.el.getBoundingClientRect().top <= 140) {
        current = item;
      }
    });

    tocLinks.forEach(function (link) {
      link.classList.remove("is-active");
    });
    if (current) {
      current.link.classList.add("is-active");
    }
  }

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
