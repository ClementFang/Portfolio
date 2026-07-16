"use strict";

/* =========================
   Logo animation
========================= */

const logo = document.querySelector(".type-logo");
const logoText = document.querySelector(".type-logo-text");

if (logo && logoText) {
  const defaultText = logo.dataset.default || "CloudFunding";
  const hoverText = logo.dataset.hover || "ClementFang";

  let animationId = 0;
  let isHovering = false;
  let isFocused = false;
  let requestedText = defaultText;

  const wait = (milliseconds) =>
    new Promise((resolve) => window.setTimeout(resolve, milliseconds));

  function splitAroundCF(text) {
    const cIndex = text.indexOf("C");
    const fIndex = text.indexOf("F", cIndex + 1);

    if (cIndex === -1 || fIndex === -1) {
      return null;
    }

    return {
      middle: text.slice(cIndex + 1, fIndex),
      ending: text.slice(fIndex + 1)
    };
  }

  function renderLogo(middle, ending) {
    logoText.textContent = `C${middle}F${ending}`;
  }

  async function morphTo(targetText) {
    const currentAnimation = ++animationId;
    const currentParts = splitAroundCF(logoText.textContent.trim());
    const targetParts = splitAroundCF(targetText);

    if (!currentParts || !targetParts) {
      logoText.textContent = targetText;
      return;
    }

    let middle = currentParts.middle;
    let ending = currentParts.ending;

    while (ending.length > 0) {
      if (currentAnimation !== animationId) return;
      ending = ending.slice(0, -1);
      renderLogo(middle, ending);
      await wait(18);
    }

    while (middle.length > 0) {
      if (currentAnimation !== animationId) return;
      middle = middle.slice(0, -1);
      renderLogo(middle, ending);
      await wait(18);
    }

    await wait(20);

    for (let index = 1; index <= targetParts.middle.length; index += 1) {
      if (currentAnimation !== animationId) return;
      middle = targetParts.middle.slice(0, index);
      renderLogo(middle, ending);
      await wait(28);
    }

    for (let index = 1; index <= targetParts.ending.length; index += 1) {
      if (currentAnimation !== animationId) return;
      ending = targetParts.ending.slice(0, index);
      renderLogo(middle, ending);
      await wait(28);
    }
  }

  function updateLogoState() {
    const targetText = isHovering || isFocused ? hoverText : defaultText;

    if (targetText === requestedText) return;

    requestedText = targetText;
    morphTo(targetText);
  }

  logo.addEventListener("pointerenter", () => {
    isHovering = true;
    updateLogoState();
  });

  logo.addEventListener("pointerleave", () => {
    isHovering = false;
    updateLogoState();
  });

  logo.addEventListener("focus", () => {
    isFocused = true;
    updateLogoState();
  });

  logo.addEventListener("blur", () => {
    isFocused = false;
    updateLogoState();
  });
}

/* =========================
   Render homepage cards
========================= */

const portfolioWorks = window.PORTFOLIO_WORKS || {
  illustration: [],
  projects: []
};

const portfolioVersion = window.PORTFOLIO_VERSION || "1";
const allowedRatios = new Set(["landscape", "portrait", "square", "wide"]);
const allowedFits = new Set(["cover", "contain"]);

function createCard(work, category) {
  const article = document.createElement("article");
  article.className = "work-card";

  if (category === "illustration") {
    article.classList.add("illustration-card");
    if (work.layout) {
      article.classList.add(`illustration-card--${work.layout}`);
    }
  } else {
    article.classList.add("project-card");
  }

  const link = document.createElement("a");
  link.href = category === "illustration"
    ? `artwork.html?id=${encodeURIComponent(work.id)}`
    : (work.href || "#");

  const ratio = allowedRatios.has(work.ratio) ? work.ratio : "landscape";
  const fit = allowedFits.has(work.fit) ? work.fit : "cover";
  const folder = category === "illustration"
    ? "assets/illustration"
    : "assets/projects";

  const media = document.createElement("div");
  media.className = `work-media media-${ratio}`;
  media.dataset.placeholder = work.id || "IMAGE";

  const image = document.createElement("img");
  image.src = `${folder}/${work.cover}?v=${encodeURIComponent(portfolioVersion)}`;
  image.alt = work.title || work.id || "Portfolio image";
  image.loading = "lazy";
  image.decoding = "async";
  image.classList.add(`fit-${fit}`);
  image.addEventListener("error", () => media.classList.add("is-placeholder"), { once: true });

  media.appendChild(image);

  const caption = document.createElement("div");
  caption.className = "work-caption";

  const title = document.createElement("h2");
  title.textContent = work.title || work.id || "Untitled";

  const year = document.createElement("time");
  year.textContent = work.year || "";
  year.dateTime = work.year || "";

  caption.append(title, year);
  link.append(media, caption);
  article.appendChild(link);

  return article;
}

function renderCategory(category, targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const works = Array.isArray(portfolioWorks[category])
    ? portfolioWorks[category]
    : [];

  const fragment = document.createDocumentFragment();
  works.forEach((work) => fragment.appendChild(createCard(work, category)));
  target.replaceChildren(fragment);
}

renderCategory("illustration", "#illustration-grid");
renderCategory("projects", "#projects-grid");

/* =========================
   Category tabs
========================= */

const categoryButtons = Array.from(document.querySelectorAll("[data-category-target]"));
const categoryPanels = Array.from(document.querySelectorAll(".category-panel"));

function activateCategory(button, updateHash = true) {
  const targetId = button.dataset.categoryTarget;
  const targetPanel = document.getElementById(targetId);
  if (!targetPanel) return;

  categoryButtons.forEach((otherButton) => {
    const active = otherButton === button;
    otherButton.classList.toggle("is-active", active);
    otherButton.setAttribute("aria-selected", String(active));
    otherButton.tabIndex = active ? 0 : -1;
  });

  categoryPanels.forEach((panel) => {
    const active = panel === targetPanel;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });

  if (updateHash) {
    window.history.replaceState(null, "", `#${targetId.replace("-panel", "")}`);
  }
}

categoryButtons.forEach((button, index) => {
  button.addEventListener("click", () => activateCategory(button));

  button.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();

    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + categoryButtons.length) % categoryButtons.length;
    const nextButton = categoryButtons[nextIndex];

    nextButton.focus();
    activateCategory(nextButton);
  });
});

const initialCategory = window.location.hash.slice(1);
const initialButton = categoryButtons.find(
  (button) => button.dataset.categoryTarget === `${initialCategory}-panel`
);

if (initialButton) {
  activateCategory(initialButton, false);
}
