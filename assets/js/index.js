const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const toggleThemeBtn = document.getElementById("theme-toggle-button");
const sidebar = document.getElementById("settings-sidebar");
const gearBtn = document.getElementById("settings-toggle");
const closeBtn = document.getElementById("close-settings");
const resetBtn = document.getElementById("reset-settings");
const defaultCustomTheme={ primary: "#6366f1", secondary: "#8b5cf6", accent: "#a855f7" }
const sidebarWidth = sidebar.offsetWidth;
const fontOptions = document.querySelectorAll(".font-option");
const customColors = document.querySelectorAll(".custom-color-option");
const portfolioFilters = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const cardsConatiner = document.querySelector("#testimonials-carousel");
const cards = document.querySelectorAll(".testimonial-card");
const prevBtn = document.querySelector("#prev-testimonial");
const nextBtn = document.querySelector("#next-testimonial");
const visibleCards = 3;
let currentIndex = 0;
const maxValidIndex = cards.length - visibleCards;
const dotsNumber = cards.length - visibleCards + 1;
const dots = document.querySelectorAll(".carousel-indicator");
const selections = document.querySelectorAll(".custom-select");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.hash === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: "-80px 0px -60% 0px",
  },
);
getFromlocalStorage();
function getFromlocalStorage() {
  getSelectedFont();
  getSelectedTheme();
  getTheme();
}
function getSelectedFont() {
  const selectedFont = localStorage.getItem("selectedFont")
    ? localStorage.getItem("selectedFont")
    : "tajawal";
  document.body.classList.add(`font-${selectedFont}`);
  fontOptions.forEach((option) => {
    option.classList.remove("active");
    if (option.dataset.font === selectedFont) {
      option.classList.add("active");
    }
    localStorage.setItem("selectedFont", selectedFont);
  });
}
function getSelectedTheme() {
  const selectedTheme = localStorage.getItem("selectedTheme")
    ? JSON.parse(localStorage.getItem("selectedTheme"))
    : { primary: "#6366f1", secondary: "#8b5cf6", accent: "#a855f7" };
  document.documentElement.style.setProperty(
    "--color-primary",
    selectedTheme.primary,
  );
  document.documentElement.style.setProperty(
    "--color-secondary",
    selectedTheme.secondary,
  );
  document.documentElement.style.setProperty(
    "--color-accent",
    selectedTheme.accent,
  );
  customColors.forEach((option) => {
    option.classList.remove(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );
    if (option.dataset.primary === selectedTheme.primary) {
      option.classList.add(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      );
    }
  });
}
// console.log(customColors[0].dataset);

function getTheme() {
  if (!(localStorage.getItem("theme") === "dark")) {
    document.documentElement.classList.remove("dark");
  }
}
const openSidebar = () => {
  sidebar.classList.remove("translate-x-full");
  sidebar.setAttribute("aria-hidden", "false");
  gearBtn.setAttribute("aria-expanded", "true");
  gearBtn.style.transform = `translateX(-${sidebarWidth / 16}rem)`;
};

const closeSidebar = () => {
  sidebar.classList.add("translate-x-full");
  sidebar.setAttribute("aria-hidden", "true");
  gearBtn.setAttribute("aria-expanded", "false");
  gearBtn.style.transform = `translateX(0)`;
};

sections.forEach((section) => observer.observe(section));

toggleThemeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
});

gearBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openSidebar();
});

closeBtn.addEventListener("click", closeSidebar);

resetBtn.addEventListener("click", function () {
   localStorage.setItem("selectedTheme",JSON.stringify(defaultCustomTheme)) ;
   localStorage.setItem("selectedFont", "tajawal"); ;
  getFromlocalStorage();
  closeSidebar();
});

document.addEventListener("click", (e) => {
  const isClickInsideSidebar = sidebar.contains(e.target);
  const isClickOnToggle = gearBtn.contains(e.target);
  const isSidebarOpen = !sidebar.classList.contains("translate-x-full");

  if (isSidebarOpen && !isClickInsideSidebar && !isClickOnToggle) {
    closeSidebar();
  }
});
fontOptions.forEach((option) => {
  option.addEventListener("click", () => {
    fontOptions.forEach((option) => {
      option.classList.remove("active");
      fontOptions.forEach((option) =>
        document.body.classList.remove(`font-${option.dataset.font}`),
      );
    });
    option.classList.add("active");
    document.body.classList.add(`font-${option.dataset.font}`);
    localStorage.setItem("selectedFont", option.dataset.font);
  });
});

customColors.forEach((option) => {
  option.addEventListener("click", () => {
    customColors.forEach((option) =>
      option.classList.remove(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      ),
    );
    document.documentElement.style.setProperty(
      "--color-primary",
      option.dataset.primary,
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      option.dataset.secondary,
    );
    document.documentElement.style.setProperty(
      "--color-accent",
      option.dataset.accent,
    );
    option.classList.add(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );
    localStorage.setItem("selectedTheme", JSON.stringify(option.dataset));
  });
});
portfolioFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    portfolioFilters.forEach((fltr) => {
      fltr.setAttribute("aria-pressed", "false");
      fltr.classList.remove(
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
        "shadow-lg",
        "shadow-primary/50",
      );
      fltr.classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
        "border",
        "border-slate-300",
        "dark:border-slate-700",
      );
    });
    filter.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    );
    filter.classList.add(
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "shadow-lg",
      "shadow-primary/50",
    );
    filter.setAttribute("aria-pressed", "true");
    portfolioItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "scale(.8)";
    });
    setTimeout(() => {
      portfolioItems.forEach((item) => {
        item.style.display = "none";
      });
      portfolioItems.forEach((item) => {
        if (
          filter.dataset.filter === "all" ||
          item.dataset.category === filter.dataset.filter
        ) {
          item.style.display = "block";
          requestAnimationFrame(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          });
        }
      });
    }, 300);
  });
});

// requestAnimationFrame waits until the browser paints the element's
// initial state (display:block, opacity:0, scale:0.8). On the next frame,
// we change it to opacity:1 and scale:1. Since the browser has already
// rendered the initial state, the CSS transition can animate smoothly.
// Without requestAnimationFrame, the browser batches both states together,
// so the element appears instantly with no fade/scale animation.
// Wait for the browser to render the display state first.
// Then change to the opacity  on the next frame so
// CSS transitions (opacity/transform) can animate.

// wihtout requestAnimationFrame
// JavaScript starts
// display = block
// opacity = 0
// opacity = 1
// JavaScript ends
// ↓ Browser paints for the first time
// display = block
// opacity = 1
// The browser never painted the opacity: 0 state.

// with requestAnimationFrame
// JavaScript starts
// display = block
// opacity = 0
// JavaScript ends
// ↓ Browser paints
// display = block
// opacity = 0
// ↓ Next frame
// opacity = 1
// ↓ Browser paints again
// display = block
// opacity = 1

function nextTestimonial() {
  currentIndex++;
  if (currentIndex > maxValidIndex) {
    currentIndex = 0;
  }
  renderCarousel();
}
function prevTestimonial() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = maxValidIndex;
  }
  renderCarousel();
}
function goTO(newIndex) {
  currentIndex = newIndex;
  renderCarousel();
}
function renderCarousel() {
  let CardWidth = cards[0].offsetWidth;
  cardsConatiner.style.transform = `translateX(${CardWidth * currentIndex}px)`;
  dots.forEach((dot) => {
    dot.classList.remove("bg-accent", "active", "scale-125");
    dot.classList.add("bg-slate-400", "dark:bg-slate-600");
    if (dot.dataset.index == currentIndex) {
      dot.classList.remove("bg-slate-400", "dark:bg-slate-600");
      dot.classList.add("bg-accent", "active", "scale-125");
    }
  });
}
nextBtn.addEventListener("click", nextTestimonial);

prevBtn.addEventListener("click", prevTestimonial);

window.addEventListener("resize", renderCarousel);
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    goTO(dot.dataset.index);
  });
});

selections.forEach((selection) => {
  const targetMenu = document.querySelector(`.${selection.dataset.name}`);
  const selectedText = selection.querySelector(".selected-text");
  const icon = selection.querySelector("i");
  
  selection.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".custom-options").forEach((menu) => {
      if (menu !== targetMenu) menu.classList.add("hidden");
    });
    targetMenu.classList.toggle("hidden");
    targetMenu.classList.contains("hidden")
      ? (icon.style.transform = "rotate(180deg)")
      : (icon.style.transform = "rotate(0deg)");
  });

  targetMenu.addEventListener("click", (e) => {
    const option = e.target.closest(".custom-option");
    if (!option) return;
    const chosenValue = option.dataset.value;
    const chosenText = option.textContent.trim();
    selectedText.textContent = chosenText;
    selectedText.classList.remove("text-slate-500", "dark:text-slate-400");
    targetMenu.classList.add("hidden");
    icon.style.transform = "rotate(180deg)";
  });
});
document.addEventListener("click", () => {
  document.querySelectorAll(".custom-options").forEach((menu) => {
    menu.classList.add("hidden");
  });
  document.querySelectorAll(".custom-select i").forEach((icon) => {
    icon.style.transform = "rotate(0deg)";
  });
});
const form = document.querySelector("form");

const validations = [
  {
    input: document.querySelector("#full-name"),
    regex: /^[A-Za-z\u0600-\u06FF\s]{3,}$/,
    required: true,
    emptyMessage: "يرجى إدخال الاسم الكامل",
  },
  {
    input: document.querySelector("#email"),
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
    required: true,
    emptyMessage: "يرجى إدخال البريد الإلكتروني",
    invalidMessage: "يرجى إدخال بريد إلكتروني صحيح",
  },
  {
    input: document.querySelector("#phone"),
    regex: /^(?:\+20|0020|0)?1[0125]\d{8}$/,
    required: false,
    invalidMessage: "يرجى إدخال رقم هاتف مصري صحيح",
  },
  {
    input: document.querySelector("#project-details"),
    regex: /^.{10,}$/s,
    required: true,
    emptyMessage: "يرجى إدخال تفاصيل المشروع",
    invalidMessage: "يرجى إدخال المزيد من التفاصيل",
  },
];

function validateField(field) {
  const value = field.input.value.trim();

  // Required
  if (field.required && !value) {
    showError(field.input, field.emptyMessage);
    return false;
  }

  // Optional & Empty
  if (!field.required && !value) {
    clearError(field.input);
    return true;
  }

  // Regex
  if (!field.regex.test(value)) {
    showError(field.input, field.invalidMessage ?? field.emptyMessage);
    return false;
  }

  clearError(field.input);
  return true;
}

// Validate while typing
validations.forEach((field) => {
  field.input.addEventListener("input", () => {
    validateField(field);
  });
});

// Validate on submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let firstInvalid = null;

  validations.forEach((field) => {
    const valid = validateField(field);

    if (!valid && !firstInvalid) {
      firstInvalid = field.input;
    }
  });

  if (firstInvalid) {
    firstInvalid.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    firstInvalid.focus();
    return;
  }

  showSuccessPopup();
  form.reset();

  validations.forEach((field) => clearError(field.input));
});

function showError(input, message) {
  input.classList.add("border-red-500");

  let error = input.parentElement.querySelector(".error-message");

  if (!error) {
    error = document.createElement("p");
    error.className = "error-message text-red-500 text-sm mt-2";
    input.parentElement.appendChild(error);
  }
  error.textContent = message;
}

function clearError(input) {
  input.classList.remove("border-red-500");

  const error = input.parentElement.querySelector(".error-message");

  if (error) {
    error.textContent = "";
  }
}

const successPopup = document.querySelector("#success-popup");
const closePopupBtn = document.querySelector(".success-popup-close");

function showSuccessPopup() {
  successPopup.classList.remove("hidden");
}

closePopupBtn.addEventListener("click", () => {
  successPopup.classList.add("hidden");
});

const scrollTopBtn = document.querySelector("#scroll-to-top");
const aboutSection = document.querySelector("#about");
function toggleScrollTopButton() {
  const bottomOfViewport = window.scrollY + window.innerHeight;
  if (bottomOfViewport >= aboutSection.offsetTop + 300) {
    scrollTopBtn.classList.remove("opacity-0", "invisible");
    scrollTopBtn.classList.add("opacity-100", "visible");
  } else {
    scrollTopBtn.classList.remove("opacity-100", "visible");
    scrollTopBtn.classList.add("opacity-0", "invisible");
  }
}
window.addEventListener("scroll", toggleScrollTopButton);
window.addEventListener("resize", toggleScrollTopButton);
toggleScrollTopButton();

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.querySelector(".mobile-menu-btn").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
})