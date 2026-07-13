"use strict";


/* =========================
   Logo morph animation
   CloudFunding → CF → ClementFang
========================= */

const logo = document.querySelector(".type-logo");
const logoText = document.querySelector(".type-logo-text");

if (logo && logoText) {
  const defaultText =
    logo.dataset.default || "CloudFunding";

  const hoverText =
    logo.dataset.hover || "ClementFang";

  let animationId = 0;
  let isHovering = false;
  let isFocused = false;
  let requestedText = defaultText;

  const wait = (milliseconds) =>
    new Promise((resolve) => {
      window.setTimeout(resolve, milliseconds);
    });

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

  function render(middle, ending) {
    logoText.textContent = `C${middle}F${ending}`;
  }

  async function morphTo(targetText) {
    const currentAnimation = ++animationId;

    const currentParts = splitAroundCF(
      logoText.textContent.trim()
    );

    const targetParts = splitAroundCF(targetText);

    if (!currentParts || !targetParts) {
      logoText.textContent = targetText;
      return;
    }

    let middle = currentParts.middle;
    let ending = currentParts.ending;

    while (ending.length > 0) {
      if (currentAnimation !== animationId) {
        return;
      }

      ending = ending.slice(0, -1);
      render(middle, ending);
      await wait(18);
    }

    while (middle.length > 0) {
      if (currentAnimation !== animationId) {
        return;
      }

      middle = middle.slice(0, -1);
      render(middle, ending);
      await wait(18);
    }

    await wait(20);

    for (
      let index = 1;
      index <= targetParts.middle.length;
      index += 1
    ) {
      if (currentAnimation !== animationId) {
        return;
      }

      middle = targetParts.middle.slice(0, index);
      render(middle, ending);
      await wait(28);
    }

    for (
      let index = 1;
      index <= targetParts.ending.length;
      index += 1
    ) {
      if (currentAnimation !== animationId) {
        return;
      }

      ending = targetParts.ending.slice(0, index);
      render(middle, ending);
      await wait(28);
    }
  }

  function updateLogoState() {
    const targetText =
      isHovering || isFocused
        ? hoverText
        : defaultText;

    if (targetText === requestedText) {
      return;
    }

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
   Illustration / Projects tabs
========================= */

const categoryButtons = Array.from(
  document.querySelectorAll("[data-category-target]")
);

const categoryPanels = Array.from(
  document.querySelectorAll(".category-panel")
);

function activateCategory(button, updateHash = true) {
  const targetId = button.dataset.categoryTarget;
  const targetPanel = document.getElementById(targetId);

  if (!targetPanel) {
    return;
  }

  categoryButtons.forEach((otherButton) => {
    const isCurrentButton = otherButton === button;

    otherButton.classList.toggle(
      "is-active",
      isCurrentButton
    );

    otherButton.setAttribute(
      "aria-selected",
      String(isCurrentButton)
    );

    otherButton.tabIndex = isCurrentButton ? 0 : -1;
  });

  categoryPanels.forEach((panel) => {
    const isTargetPanel = panel === targetPanel;

    panel.classList.toggle(
      "is-active",
      isTargetPanel
    );

    panel.hidden = !isTargetPanel;
  });

  if (updateHash) {
    const categoryName = targetId.replace("-panel", "");

    window.history.replaceState(
      null,
      "",
      `#${categoryName}`
    );
  }
}

categoryButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    activateCategory(button);
  });

  button.addEventListener("keydown", (event) => {
    if (
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight"
    ) {
      return;
    }

    event.preventDefault();

    const direction =
      event.key === "ArrowRight" ? 1 : -1;

    const nextIndex =
      (index + direction + categoryButtons.length) %
      categoryButtons.length;

    const nextButton = categoryButtons[nextIndex];

    nextButton.focus();
    activateCategory(nextButton);
  });
});

const initialCategory = window.location.hash.slice(1);

const initialButton = categoryButtons.find(
  (button) =>
    button.dataset.categoryTarget ===
    `${initialCategory}-panel`
);

if (initialButton) {
  activateCategory(initialButton, false);
}


/* =========================
   Missing-image placeholders
========================= */

document.querySelectorAll(".work-media img").forEach((image) => {
  const media = image.closest(".work-media");

  if (!media) {
    return;
  }

  function showPlaceholder() {
    media.classList.add("is-placeholder");
  }

  if (image.complete && image.naturalWidth === 0) {
    showPlaceholder();
  } else {
    image.addEventListener(
      "error",
      showPlaceholder,
      { once: true }
    );
  }
});
