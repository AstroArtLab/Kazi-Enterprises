/**
 * ==========================================================================
 * DIGITAL SERVICES AGENCY — INTERACTION & CORE SCRIPT
 * Vanilla JavaScript (ES6+) — Zero Framework, Zero Dependencies
 * ==========================================================================
 */

// ==========================================================================
// 1. COMPANY IDENTITY & SITE CONFIGURATION [EDIT ME]
// Edit this single object to update brand names, contact info, and colors
// across the entire website without touching any HTML or CSS files.
// ==========================================================================
const CONFIG = {
  // Brand Basics
  companyName: "KAZI ENTERPRISES",
  tagline: "We build digital brands that actually convert.",
  logoInitials: "KE",

  // Contact Information
  email: "kazienterprisesltd@gmail.com",

  // Social Links
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    behance: "https://behance.net",
    twitter: "https://twitter.com",
    github: "https://github.com"
  },

  // Color Accent (Hex or RGB) — dynamically sets CSS variable --accent
  accentColor: "#6366f1",

  // Availability status badge in hero
  statusBadge: "Accepting Q3/Q4 Client Projects"
};

// ==========================================================================
// 2. TESTIMONIALS DATA [EDIT ME]
// Add, remove, or modify client reviews below.
// ==========================================================================
const TESTIMONIALS = [
  {
    quote: "Kazi Enterprises overhauled our entire Shopify architecture and paid acquisition funnel. Our direct-to-consumer store saw a 140% surge in monthly recurring revenue within 90 days.",
    author: "Kamran Siddiqui",
    role: "Founder & CEO",
    company: "Luxe Leather Goods",
    initials: "KS",
    rating: 5
  },
  {
    quote: "Finding an agency that truly understands both high-aesthetic design and relentless technical SEO is rare. We ranked on page 1 for our target high-intent keywords in under 4 months.",
    author: "Sophia Vance",
    role: "Head of Growth",
    company: "Aura Fintech UK",
    initials: "SV",
    rating: 5
  },
  {
    quote: "The website they built for us isn't just stunning—it converted our enterprise inbound lead rate by 3.2x. Their team is brutally honest, agile, and delivers zero fluff.",
    author: "Zayn Hashmi",
    role: "VP of Product",
    company: "CloudScale Analytics",
    initials: "ZH",
    rating: 5
  },
  {
    quote: "Their social growth team took our brand from zero engagement to generating 2M+ organic impressions a month. They don't just post content—they architect cultural relevance.",
    author: "Elena Rostova",
    role: "Brand Director",
    company: "Komorebi Lifestyle",
    initials: "ER",
    rating: 5
  }
];

/* ==========================================================================
   3. DOM INITIALIZATION & CONFIG INJECTION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initSiteConfig();
  initCustomCursor();
  initMagneticButtons();
  initStickyHeader();
  initMobileMenu();
  initSmoothScroll();
  initScrollSpy();
  initScrollReveal();
  initStatCounters();
  initTestimonialsCarousel();
  initContactForm();
  initFooterYear();
});

/**
 * Injects CONFIG values into all matching HTML elements and sets CSS variables.
 */
function initSiteConfig() {
  // Apply Accent Color to CSS Root Variable
  if (CONFIG.accentColor) {
    document.documentElement.style.setProperty("--accent", CONFIG.accentColor);
  }

  // Update elements with data-config attribute
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.getAttribute("data-config");
    if (!key) return;

    if (key === "companyName") {
      el.textContent = CONFIG.companyName;
    } else if (key === "tagline") {
      el.textContent = CONFIG.tagline;
    } else if (key === "logoInitials") {
      el.textContent = CONFIG.logoInitials;
    } else if (key === "email") {
      el.textContent = CONFIG.email;
      if (el.tagName === "A") el.setAttribute("href", `mailto:${CONFIG.email}`);
    } else if (key === "phone") {
      el.textContent = CONFIG.phone;
      if (el.tagName === "A") el.setAttribute("href", `tel:${CONFIG.phone.replace(/[^0-9+]/g, "")}`);
    } else if (key === "city") {
      el.textContent = CONFIG.city;
    } else if (key === "officeAddress") {
      el.textContent = CONFIG.officeAddress;
    } else if (key === "statusBadge") {
      el.textContent = CONFIG.statusBadge;
    }
  });

  // Inject Social Links
  document.querySelectorAll("[data-social]").forEach((el) => {
    const platform = el.getAttribute("data-social");
    if (platform && CONFIG.social[platform]) {
      el.setAttribute("href", CONFIG.social[platform]);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    }
  });

  // Dynamic Page Title & Meta Tags
  document.title = `${CONFIG.companyName} — ${CONFIG.tagline}`;
}

/* ==========================================================================
   4. CUSTOM CURSOR (DOT & RING WITH SMOOTH LERP)
   ========================================================================== */
function initCustomCursor() {
  // Check if pointer is touch-capable or prefers reduced motion
  const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isTouch || prefersReduced) return;

  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");

  if (!cursorDot || !cursorRing) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isVisible = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      cursorDot.style.opacity = "1";
      cursorRing.style.opacity = "1";
      isVisible = true;
    }

    // Direct update for inner dot
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  window.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
    cursorRing.style.opacity = "0";
    isVisible = false;
  });

  // Smooth lerp loop for outer ring
  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Hover state expansions on clickable elements
  const hoverables = document.querySelectorAll("a, button, input, select, textarea, .service-card, .stat-card, .process-card, .btn");
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-grow"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-grow"));
  });
}

/* ==========================================================================
   5. MAGNETIC BUTTONS
   ========================================================================== */
function initMagneticButtons() {
  const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  if (isTouch) return;

  const magnetics = document.querySelectorAll(".magnetic");

  magnetics.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - btnCenterX) * 0.3;
      const deltaY = (e.clientY - btnCenterY) * 0.3;

      btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate3d(0px, 0px, 0)";
    });
  });
}

/* ==========================================================================
   6. STICKY HEADER & MOBILE DRAWER
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

function initMobileMenu() {
  const toggle = document.getElementById("mobile-toggle");
  const nav = document.getElementById("nav-menu");
  const links = document.querySelectorAll(".nav-link");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "";
  });

  // Close drawer on link click
  links.forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

/* ==========================================================================
   7. SMOOTH ANCHOR SCROLLING WITH OFFSET
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById("site-header")?.offsetHeight || 76;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

/* ==========================================================================
   8. SCROLLSPY (ACTIVE NAV LINK HIGHLIGHT)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: "-80px 0px -50% 0px"
  });

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   9. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  });

  elements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   10. COUNT-UP STATS ANIMATION
   ========================================================================== */
function initStatCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetEl = entry.target;
        const targetVal = parseFloat(targetEl.getAttribute("data-target") || "0");
        const decimals = parseInt(targetEl.getAttribute("data-decimals") || "0", 10);
        const duration = 1600; // ms
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic formula
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = targetVal * easeOut;

          targetEl.textContent = currentVal.toFixed(decimals);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            targetEl.textContent = targetVal.toFixed(decimals);
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(targetEl);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach((counter) => observer.observe(counter));
}

/* ==========================================================================
   11. TESTIMONIALS CAROUSEL
   ========================================================================== */
function initTestimonialsCarousel() {
  const container = document.getElementById("testimonials-container");
  const dotsContainer = document.getElementById("carousel-dots");
  const prevBtn = document.getElementById("testimonial-prev");
  const nextBtn = document.getElementById("testimonial-next");

  if (!container || !TESTIMONIALS.length) return;

  // Render Slides dynamically from TESTIMONIALS array
  container.innerHTML = "";
  if (dotsContainer) dotsContainer.innerHTML = "";

  TESTIMONIALS.forEach((item, index) => {
    // Generate star SVG icons
    const starsHtml = Array(item.rating || 5)
      .fill(0)
      .map(() => `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      `)
      .join("");

    const slide = document.createElement("div");
    slide.className = `testimonial-slide ${index === 0 ? "active" : ""}`;
    slide.id = `testimonial-slide-${index}`;
    slide.innerHTML = `
      <div class="testimonial-rating" aria-label="${item.rating} out of 5 stars">
        ${starsHtml}
      </div>
      <blockquote class="testimonial-quote">
        &ldquo;${item.quote}&rdquo;
      </blockquote>
      <div class="testimonial-author-wrapper">
        <div class="author-avatar">${item.initials}</div>
        <div class="author-info">
          <div class="author-name">${item.author}</div>
          <div class="author-role">${item.role} &bull; ${item.company}</div>
        </div>
      </div>
    `;
    container.appendChild(slide);

    // Dot button
    if (dotsContainer) {
      const dot = document.createElement("button");
      dot.className = `carousel-dot ${index === 0 ? "active" : ""}`;
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    }
  });

  let currentIndex = 0;
  const slides = container.querySelectorAll(".testimonial-slide");
  const dots = dotsContainer ? dotsContainer.querySelectorAll(".carousel-dot") : [];

  function goToSlide(index) {
    slides[currentIndex].classList.remove("active");
    if (dots[currentIndex]) dots[currentIndex].classList.remove("active");

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add("active");
    if (dots[currentIndex]) dots[currentIndex].classList.add("active");
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
  }

  // Auto rotate every 6 seconds (pauses on mouseenter)
  let autoplayTimer = setInterval(() => goToSlide(currentIndex + 1), 6000);
  const viewport = document.querySelector(".testimonial-viewport");
  if (viewport) {
    viewport.addEventListener("mouseenter", () => clearInterval(autoplayTimer));
    viewport.addEventListener("mouseleave", () => {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => goToSlide(currentIndex + 1), 6000);
    });
  }
}

/* ==========================================================================
   12. CONTACT FORM & VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const toast = document.getElementById("form-toast");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Fields
    const nameField = form.querySelector("#contact-name");
    const emailField = form.querySelector("#contact-email");
    const serviceField = form.querySelector("#contact-service");
    const messageField = form.querySelector("#contact-message");

    // Reset error states
    form.querySelectorAll(".form-group").forEach((group) => group.classList.remove("has-error"));

    // Validate Name
    if (!nameField.value.trim()) {
      showError(nameField, "Please provide your full name.");
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value.trim())) {
      showError(emailField, "Please enter a valid email address.");
      isValid = false;
    }

    // Validate Service
    if (!serviceField.value) {
      showError(serviceField, "Please select a service of interest.");
      isValid = false;
    }

    // Validate Message
    if (!messageField.value.trim() || messageField.value.trim().length < 10) {
      showError(messageField, "Message must be at least 10 characters.");
      isValid = false;
    }

    if (!isValid) return;

    // Package Form Data
    const formData = {
      name: nameField.value.trim(),
      email: emailField.value.trim(),
      service: serviceField.value,
      message: messageField.value.trim(),
      timestamp: new Date().toISOString()
    };

    console.log("Contact Form Submission Data:", formData);

    // ==========================================================================
    // TODO: BACKEND INTEGRATION [EDIT ME]
    // Replace this simulation with your actual form endpoint or service:
    // 
    // Option A (Formspree):
    //   fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //     method: "POST",
    //     body: JSON.stringify(formData),
    //     headers: { "Content-Type": "application/json" }
    //   })
    //   
    // Option B (EmailJS):
    //   emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
    //   
    // Option C (Custom REST API / Serverless function):
    //   fetch("/api/contact", { ... })
    // ==========================================================================

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Transmitting Inquiry...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      if (toast) {
        toast.className = "form-toast success";
        toast.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>Thank you! Your message has been received. Our team will review your project and get back to you within 24 hours.</span>
        `;
        toast.style.display = "flex";

        setTimeout(() => {
          toast.style.display = "none";
        }, 8000);
      }
    }, 900);
  });

  function showError(inputEl, message) {
    const parent = inputEl.closest(".form-group");
    if (!parent) return;
    parent.classList.add("has-error");
    const errText = parent.querySelector(".form-error-msg");
    if (errText) errText.textContent = message;
  }
}

/* ==========================================================================
   13. FOOTER CURRENT YEAR
   ========================================================================== */
function initFooterYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
