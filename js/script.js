
"use strict";

// Elementos da janela de ampliação
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");

const closeButton = document.querySelector("[data-lightbox-close]");
const prevButton = document.querySelector("[data-lightbox-prev]");
const nextButton = document.querySelector("[data-lightbox-next]");

// Obras da galeria
const artworkButtons = document.querySelectorAll("[data-lightbox]");

let currentIndex = 0;
let previousFocus = null;

// Atualiza o conteúdo da janela

function showArtwork(index) {
    const artwork = artworkButtons[index];

    if (!artwork) {
        return;
    }

    const image = artwork.querySelector("img");
    const figure = artwork.closest("figure");
    const caption = figure?.querySelector("figcaption");

    currentIndex = index;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxCaption.textContent =
        caption?.textContent.trim() || image.alt;

    prevButton.disabled = artworkButtons.length < 2;
    nextButton.disabled = artworkButtons.length < 2;
}

// Abre uma obra
function openLightbox(index) {
    previousFocus = document.activeElement;

    showArtwork(index);

    if (!lightbox.open) {
        lightbox.showModal();
    }

    closeButton.focus();
}

// Fecha a janela e restaura o foco
function closeLightbox() {
    if (lightbox.open) {
        lightbox.close();
    }
}

// Navega entre as obras
function showPrevious() {
    const previousIndex =
        (currentIndex - 1 + artworkButtons.length)
        % artworkButtons.length;

    showArtwork(previousIndex);
}

function showNext() {
    const nextIndex =
        (currentIndex + 1) % artworkButtons.length;

    showArtwork(nextIndex);
}

// Eventos da galeria
artworkButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        openLightbox(index);
    });
});

// Eventos dos controles
closeButton.addEventListener("click", closeLightbox);
prevButton.addEventListener("click", showPrevious);
nextButton.addEventListener("click", showNext);

// Fecha ao clicar fora do conteúdo
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Atalhos de teclado
lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
    }

    if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
    }
});

// Restaura o foco após fechar
lightbox.addEventListener("close", () => {
    lightboxImage.removeAttribute("src");

    if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
    }
});

// Atualiza automaticamente o ano do rodapé
document.querySelector("#current-year").textContent =
    new Date().getFullYear();
