(function () {
  "use strict";

  var progressBar = document.getElementById("reading-progress");
  var backToTop = document.getElementById("back-to-top");
  var tocLinks = document.querySelectorAll(".article-toc__list a");
  var headings = [];

  tocLinks.forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.charAt(0) === "#") {
      var el = document.getElementById(id.slice(1));
      if (el) headings.push({ el: el, link: link });
    }
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
      if (item.el.getBoundingClientRect().top <= 120) {
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
