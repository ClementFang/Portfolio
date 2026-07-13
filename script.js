"use strict";

const logo = document.querySelector(".type-logo");
const logoText = document.querySelector(".type-logo-text");

if (logo && logoText) {
  const defaultText = logo.dataset.default || "CloudFunding";
  const hoverText = logo.dataset.hover || "ClementFang";

  let animationId = 0;

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

    /* 刪除 F 後面的文字 */
    while (ending.length > 0) {
      if (currentAnimation !== animationId) return;

      ending = ending.slice(0, -1);
      render(middle, ending);

      await wait(30);
    }

    /* 刪除 C 與 F 之間的文字，留下 CF */
    while (middle.length > 0) {
      if (currentAnimation !== animationId) return;

      middle = middle.slice(0, -1);
      render(middle, ending);

      await wait(30);
    }

    await wait(80);

    /* 在 C 與 F 之間打出新文字 */
    for (
      let index = 1;
      index <= targetParts.middle.length;
      index += 1
    ) {
      if (currentAnimation !== animationId) return;

      middle = targetParts.middle.slice(0, index);
      render(middle, ending);

      await wait(60);
    }

    /* 在 F 後面打出新文字 */
    for (
      let index = 1;
      index <= targetParts.ending.length;
      index += 1
    ) {
      if (currentAnimation !== animationId) return;

      ending = targetParts.ending.slice(0, index);
      render(middle, ending);

      await wait(60);
    }
  }

 let isHovering = false;
let isFocused = false;
let requestedText = defaultText;

function updateLogoState() {
  const targetText =
    isHovering || isFocused
      ? hoverText
      : defaultText;

  /* 已經在前往相同名稱時，不再重複觸發 */
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
