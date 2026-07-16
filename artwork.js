"use strict";

const params = new URLSearchParams(window.location.search);
const artworkId = params.get("id");
const version = window.PORTFOLIO_VERSION || "1";
const illustrationWorks = window.PORTFOLIO_WORKS?.illustration || [];
const artwork = illustrationWorks.find((work) => work.id === artworkId);

const numberElement = document.querySelector("#artwork-number");
const titleElement = document.querySelector("#artwork-title");
const yearElement = document.querySelector("#artwork-year");
const mediumElement = document.querySelector("#artwork-medium");
const descriptionElement = document.querySelector("#artwork-description");
const galleryElement = document.querySelector("#artwork-gallery");

const viewer = document.querySelector("#image-viewer");
const viewerImage = document.querySelector("#image-viewer-image");
const viewerCaption = document.querySelector("#image-viewer-caption");
const viewerClose = document.querySelector("#image-viewer-close");

function openViewer(source, alt, caption) {
  if (!viewer || !viewerImage) return;

  viewerImage.src = source;
  viewerImage.alt = alt;
  if (viewerCaption) viewerCaption.textContent = caption || "";
  viewer.showModal();
}

function closeViewer() {
  if (!viewer) return;
  viewer.close();
  if (viewerImage) viewerImage.src = "";
}

function createGalleryFigure(imageData, index) {
  const figure = document.createElement("figure");
  figure.className = index === 0
    ? "artwork-image artwork-image--hero"
    : "artwork-image";

  const button = document.createElement("button");
  button.className = "artwork-image-button";
  button.type = "button";

  const image = document.createElement("img");
  const imagePath = `assets/illustration/${imageData.file}?v=${encodeURIComponent(version)}`;
  image.src = imagePath;
  image.alt = imageData.caption || artwork.title;
  image.loading = index === 0 ? "eager" : "lazy";
  image.decoding = "async";

  const fallback = document.createElement("div");
  fallback.className = "detail-placeholder";
  fallback.textContent = imageData.caption || artwork.id;
  fallback.hidden = true;

  image.addEventListener("error", () => {
    image.hidden = true;
    fallback.hidden = false;
    button.disabled = true;
  }, { once: true });

  button.append(image, fallback);
  button.addEventListener("click", () => {
    openViewer(imagePath, image.alt, imageData.caption);
  });

  figure.appendChild(button);

  if (imageData.caption) {
    const caption = document.createElement("figcaption");
    caption.textContent = imageData.caption;
    figure.appendChild(caption);
  }

  return figure;
}

function renderArtwork() {
  if (!artwork) {
    document.title = "Artwork Not Found — ClementFang";
    titleElement.textContent = "Artwork not found";
    descriptionElement.textContent = "The requested illustration could not be found.";
    return;
  }

  document.title = `${artwork.title} — ClementFang`;
  numberElement.textContent = artwork.id;
  titleElement.textContent = artwork.title;
  yearElement.textContent = artwork.year || "";
  mediumElement.textContent = artwork.medium || "";
  descriptionElement.textContent = artwork.description || "";

  const gallery = Array.isArray(artwork.gallery) ? artwork.gallery : [];
  const fragment = document.createDocumentFragment();
  gallery.forEach((imageData, index) => {
    fragment.appendChild(createGalleryFigure(imageData, index));
  });

  galleryElement.replaceChildren(fragment);
}

viewerClose?.addEventListener("click", closeViewer);

viewer?.addEventListener("click", (event) => {
  if (event.target === viewer) closeViewer();
});

viewer?.addEventListener("cancel", () => closeViewer());

renderArtwork();
