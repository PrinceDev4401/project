// ---------- Intro splash on load/refresh ----------
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const splash = document.getElementById("intro-splash");
const body = document.body;

if (prefersReducedMotion) {
  splash.remove();
  body.classList.add("revealed");
} else {
  body.classList.add("intro-lock");
  window.addEventListener("load", () => {
    setTimeout(() => {
      splash.classList.add("hide");
      body.classList.remove("intro-lock");
      body.classList.add("revealed");
      splash.addEventListener("transitionend", () => splash.remove(), {
        once: true,
      });
    }, 650);
  });
}

// ---------- Hero background slideshow ----------
const HERO_SLIDES = ["bg.png", "bg2.jpg", "bg3.jpeg"];
const SLIDE_INTERVAL_MS = 5000;

const slideshow = document.getElementById("hero-slideshow");
const dotsWrap = document.getElementById("hero-dots");
let currentSlide = 0;
let slideTimer = null;

function buildSlideshow() {
  slideshow.innerHTML = "";
  dotsWrap.innerHTML = "";

  HERO_SLIDES.forEach((src, i) => {
    const slide = document.createElement("div");
    slide.className = "slide" + (i === 0 ? " active" : "");
    slide.style.backgroundImage = `url("${src}")`;
    slideshow.appendChild(slide);

    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Show slide ${i + 1}`);
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });

  // Hide the dots entirely when there's nothing to switch between
  dotsWrap.style.display = HERO_SLIDES.length > 1 ? "flex" : "none";
}

function goToSlide(index) {
  const slides = slideshow.querySelectorAll(".slide");
  const dots = dotsWrap.querySelectorAll("button");
  slides[currentSlide]?.classList.remove("active");
  dots[currentSlide]?.classList.remove("active");
  currentSlide = index;
  slides[currentSlide]?.classList.add("active");
  dots[currentSlide]?.classList.add("active");
}

function startAutoAdvance() {
  if (slideTimer) clearInterval(slideTimer);
  if (HERO_SLIDES.length <= 1) return;
  slideTimer = setInterval(() => {
    goToSlide((currentSlide + 1) % HERO_SLIDES.length);
  }, SLIDE_INTERVAL_MS);
}

buildSlideshow();
startAutoAdvance();

// Mobile menu toggle
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("site-nav");

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.classList.toggle("open", isOpen);
  toggle.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

// Subtle header shadow on scroll
const header = document.getElementById("site-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 8);
});
