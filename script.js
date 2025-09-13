// Scroll reveal animation
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        const children = entry.target.querySelectorAll(
          ".feature, .step, .card, .grid > *, .bento-grid > *"
        );
        children.forEach((child, index) =>
          child.style.setProperty("--delay", `${index * 100}ms`)
        );
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// Mobile menu
const body = document.body;
const toggleBtn = document.querySelector(".menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

function closeMenu() {
  mobileNav.classList.remove("open");
  toggleBtn.setAttribute("aria-expanded", "false");
  body.classList.remove("menu-open");
}

function openMenu() {
  mobileNav.classList.add("open");
  toggleBtn.setAttribute("aria-expanded", "true");
  body.classList.add("menu-open");
}

toggleBtn.addEventListener("click", () => {
  const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
  expanded ? closeMenu() : openMenu();
});

// Close menu on link click
mobileNav
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));

// Close menu on outside click
document.addEventListener("click", (e) => {
  if (!mobileNav.contains(e.target) && !toggleBtn.contains(e.target)) {
    closeMenu();
  }
});

// Close menu with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
