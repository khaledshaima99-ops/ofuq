(function () {
  "use strict";

  var navbar = document.getElementById("navbar");
  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");

  function onScroll() {
    if (navbar) navbar.classList.toggle("is-scrolled", window.scrollY > 20);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    if (!mainNav || !menuToggle) return;
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "فتح القائمة");
    document.body.classList.remove("nav-open");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
      menuToggle.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
      document.body.classList.toggle("nav-open", open);
    });

    mainNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  var links = Array.prototype.slice.call(document.querySelectorAll(".main-nav a[href^='#']"));
  var sections = links.map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);

  function setActiveLink(sectionId) {
    links.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + sectionId;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        setActiveLink(entry.target.id);
      });
    }, { rootMargin: "-42% 0px -52% 0px" });
    sections.forEach(function (section) { spy.observe(section); });
  }

  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window) {
    var reveal = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = (index % 4) * 60 + "ms";
      reveal.observe(item);
    });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }
})();
