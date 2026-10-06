// ============================================================
// VISTORA - IMAGE GALLERY
// Frontend Only
// ============================================================


// ============================================================
// IMAGE DATA
// ============================================================

const images = [
    {
        src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
        category: "Nature",
        title: "Mountain Escape",
        addedAt: "Gallery Collection"
    },
    {
        src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=80",
        category: "Architecture",
        title: "Modern Lines",
        addedAt: "Gallery Collection"
    },
    {
        src: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=900&q=80",
        category: "Wildlife",
        title: "Into the Wild",
        addedAt: "Gallery Collection"
    },
    {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
        category: "Travel",
        title: "Ocean Breeze",
        addedAt: "Gallery Collection"
    },
    {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
        category: "Nature",
        title: "Forest Dreams",
        addedAt: "Gallery Collection"
    },
    {
        src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80",
        category: "Architecture",
        title: "Urban Geometry",
        addedAt: "Gallery Collection"
    },
    {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
        category: "Travel",
        title: "Into the Valley",
        addedAt: "Gallery Collection"
    },
    {
        src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80",
        category: "Wildlife",
        title: "Wild Spirit",
        addedAt: "Gallery Collection"
    },
    {
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
        category: "Nature",
        title: "Frozen Peaks",
        addedAt: "Gallery Collection"
    },
    {
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
        category: "Architecture",
        title: "Creative Spaces",
        addedAt: "Gallery Collection"
    },
    {
        src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80",
        category: "Travel",
        title: "Peaceful Journey",
        addedAt: "Gallery Collection"
    },
    {
        src: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=900&q=80",
        category: "Wildlife",
        title: "Nature's Beauty",
        addedAt: "Gallery Collection"
    }
];


// ============================================================
// ELEMENT HELPERS
// ============================================================

function getElement(id) {
    return document.getElementById(id);
}


// ============================================================
// MAIN ELEMENTS
// ============================================================

const lightbox = getElement("lightbox");
const lightboxImage = getElement("lightboxImage");
const lightboxCategory = getElement("lightboxCategory");
const lightboxTitle = getElement("lightboxTitle");
const currentImage = getElement("currentImage");
const totalImages = getElement("totalImages");

const closeLightbox = getElement("closeLightbox");
const prevBtn = getElement("prevBtn");
const nextBtn = getElement("nextBtn");

const galleryGrid = document.querySelector(".gallery-grid");
const filterButtons = document.querySelectorAll(".filter-btn");


// ============================================================
// SEARCH / FAVORITES / THEME
// ============================================================

const searchInput = getElement("searchInput");
const clearSearch = getElement("clearSearch");

const favoritesToggle = getElement("favoritesToggle");
const favoritesCount = getElement("favoritesCount");
const favoriteCountDisplay = getElement("favoriteCountDisplay");

const themeToggle = getElement("themeToggle");
const themeIcon = getElement("themeIcon");

const searchStatus = getElement("searchStatus");
const searchResultText = getElement("searchResultText");

const noResults = getElement("noResults");
const resetGallery = getElement("resetGallery");


// ============================================================
// LIGHTBOX ACTIONS
// ============================================================

const lightboxFavorite = getElement("lightboxFavorite");
const downloadImage = getElement("downloadImage");
const shareImage = getElement("shareImage");
const fullscreenImage = getElement("fullscreenImage");

const toast = getElement("toast");
const toastMessage = getElement("toastMessage");


// ============================================================
// ADD IMAGE
// ============================================================

const openAddImage = getElement("openAddImage");
const addImageModal = getElement("addImageModal");
const addImageBackdrop = getElement("addImageBackdrop");
const closeAddImage = getElement("closeAddImage");

const imageFileInput = getElement("imageFileInput");
const chooseImageBtn = getElement("chooseImageBtn");
const uploadArea = getElement("uploadArea");

const uploadPlaceholder =
    getElement("uploadPlaceholder") ||
    getElement("uploadBox");

const imagePreviewContainer =
    getElement("imagePreviewContainer");

const imagePreview =
    getElement("imagePreview");

const removeImagePreview =
    getElement("removeImagePreview");

const imageTitleInput =
    getElement("imageTitleInput");

const imageCategoryInput =
    getElement("imageCategoryInput");

const cancelAddImage =
    getElement("cancelAddImage");

const confirmAddImage =
    getElement("confirmAddImage");


// ============================================================
// LIGHTBOX EXTRA INFO
// Supports different possible IDs in HTML
// ============================================================

const lightboxDimensions =
    getElement("lightboxDimensions") ||
    getElement("imageDimensions");

const lightboxFileSize =
    getElement("lightboxFileSize") ||
    getElement("imageFileSize");

const lightboxAdded =
    getElement("lightboxAdded") ||
    getElement("imageAdded");


// ============================================================
// STATE
// ============================================================

let currentIndex = 0;
let currentFilter = "all";
let selectedImageData = "";

let slideshowTimer = null;
let slideshowPlaying = false;

const SLIDESHOW_INTERVAL = 3000;

let slideshowButton = null;

let toastTimer = null;


// ============================================================
// FAVORITES
// ============================================================

let favorites = [];

try {
    const savedFavorites =
        localStorage.getItem("vistoraFavorites");

    if (savedFavorites) {
        const parsedFavorites =
            JSON.parse(savedFavorites);

        if (Array.isArray(parsedFavorites)) {
            favorites = parsedFavorites
                .filter((index) => Number.isInteger(index))
                .filter((index) => index >= 0);
        }
    }
} catch (error) {
    console.error(
        "Unable to load favorites:",
        error
    );

    favorites = [];
}


// ============================================================
// LOAD CUSTOM IMAGES
// ============================================================

function loadCustomImages() {
    try {
        const savedImages =
            localStorage.getItem("vistoraCustomImages");

        if (!savedImages) {
            return;
        }

        const customImages =
            JSON.parse(savedImages);

        if (!Array.isArray(customImages)) {
            return;
        }

        customImages.forEach((image) => {
            if (
                image &&
                typeof image.src === "string" &&
                typeof image.title === "string" &&
                typeof image.category === "string"
            ) {
                images.push({
                    src: image.src,
                    category: image.category,
                    title: image.title,
                    custom: true,
                    addedAt:
                        image.addedAt ||
                        "Recently added"
                });
            }
        });
    } catch (error) {
        console.error(
            "Unable to load custom images:",
            error
        );
    }
}


// ============================================================
// SAVE CUSTOM IMAGES
// ============================================================

function saveCustomImages() {
    try {
        const customImages =
            images.filter(
                (image) =>
                    image.custom === true
            );

        localStorage.setItem(
            "vistoraCustomImages",
            JSON.stringify(customImages)
        );
    } catch (error) {
        console.error(
            "Unable to save custom images:",
            error
        );

        showToast(
            "Image could not be saved. Storage may be full."
        );
    }
}


// ============================================================
// INITIALIZE CUSTOM IMAGES
// ============================================================

loadCustomImages();


// ============================================================
// IMAGE COUNT
// ============================================================

function updateImageCounts() {
    if (totalImages) {
        totalImages.textContent =
            images.length;
    }
}


// ============================================================
// FAVORITE CHECK
// ============================================================

function isFavorite(index) {
    return favorites.includes(index);
}


// ============================================================
// SAVE FAVORITES
// ============================================================

function saveFavorites() {
    try {
        localStorage.setItem(
            "vistoraFavorites",
            JSON.stringify(favorites)
        );
    } catch (error) {
        console.error(
            "Unable to save favorites:",
            error
        );
    }
}


// ============================================================
// UPDATE FAVORITE UI
// ============================================================

function updateFavoriteUI() {

    const favoriteButtons =
        document.querySelectorAll(
            ".favorite-btn"
        );

    favoriteButtons.forEach((button) => {

        const index =
            Number(button.dataset.index);

        const image =
            images[index];

        if (!image) {
            return;
        }

        const active =
            isFavorite(index);

        button.classList.toggle(
            "active",
            active
        );

        button.textContent =
            active ? "♥" : "♡";

        button.setAttribute(
            "aria-label",
            active
                ? `Remove ${image.title} from favorites`
                : `Add ${image.title} to favorites`
        );

        button.setAttribute(
            "title",
            active
                ? "Remove from favorites"
                : "Add to favorites"
        );
    });


    if (favoritesCount) {
        favoritesCount.textContent =
            favorites.length;
    }


    if (favoriteCountDisplay) {
        favoriteCountDisplay.textContent =
            favorites.length;
    }


    if (lightboxFavorite) {

        const active =
            isFavorite(currentIndex);

        lightboxFavorite.classList.toggle(
            "active",
            active
        );

        lightboxFavorite.textContent =
            active ? "♥" : "♡";

        lightboxFavorite.setAttribute(
            "title",
            active
                ? "Remove from favorites"
                : "Add to favorites"
        );
    }
}


// ============================================================
// TOAST
// ============================================================

function showToast(message) {

    if (!toast || !toastMessage) {
        return;
    }

    toastMessage.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
}


// ============================================================
// TOGGLE FAVORITE
// ============================================================

function toggleFavorite(index) {

    const image =
        images[index];

    if (!image) {
        return;
    }

    const position =
        favorites.indexOf(index);

    if (position === -1) {

        favorites.push(index);

        showToast(
            `${image.title} added to favorites`
        );

    } else {

        favorites.splice(
            position,
            1
        );

        showToast(
            `${image.title} removed from favorites`
        );
    }

    saveFavorites();

    updateFavoriteUI();

    applyFilters();
}


// ============================================================
// CREATE GALLERY ITEM
// ============================================================

function createGalleryItem(image, index) {

    const item =
        document.createElement("article");

    item.className =
        "gallery-item";

    item.dataset.index =
        index;

    item.dataset.category =
        image.category;

    const customDeleteButton =
        image.custom
            ? `
                <button
                    class="delete-image-btn"
                    type="button"
                    data-index="${index}"
                    aria-label="Delete ${image.title}"
                    title="Delete image"
                >
                    🗑️
                </button>
            `
            : "";

    item.innerHTML = `
        <img
            src="${image.src}"
            alt="${image.title}"
            loading="lazy"
        >

        <button
            class="favorite-btn"
            type="button"
            data-index="${index}"
            aria-label="Add ${image.title} to favorites"
            title="Add to favorites"
        >
            ♡
        </button>

        ${customDeleteButton}

        <div class="image-overlay">

            <div class="gallery-info">

                <span class="gallery-category">
                    ${image.category}
                </span>

                <h3>
                    ${image.title}
                </h3>

            </div>

        </div>
    `;

    return item;
}


// ============================================================
// RENDER COMPLETE GALLERY
// IMPORTANT FIX:
// Rebuilds indexes correctly after add/delete.
// ============================================================

function renderGallery() {

    if (!galleryGrid) {
        return;
    }

    const noResultsElement =
        document.getElementById("noResults");

    const galleryItems =
        galleryGrid.querySelectorAll(
            ".gallery-item"
        );

    galleryItems.forEach((item) => {
        item.remove();
    });


    images.forEach((image, index) => {

        const item =
            createGalleryItem(
                image,
                index
            );

        if (noResultsElement) {

            galleryGrid.insertBefore(
                item,
                noResultsElement
            );

        } else {

            galleryGrid.appendChild(
                item
            );
        }
    });


    updateFavoriteUI();

    applyFilters();
}


// ============================================================
// DELETE CUSTOM IMAGE
// ============================================================

function deleteCustomImage(index) {

    const image =
        images[index];

    if (!image) {
        return;
    }

    if (!image.custom) {

        showToast(
            "Original gallery images cannot be deleted."
        );

        return;
    }


    const confirmed =
        window.confirm(
            `Delete "${image.title}" from your gallery?`
        );

    if (!confirmed) {
        return;
    }


    // --------------------------------------------------------
    // Remove favorite index
    // --------------------------------------------------------

    const favoritePosition =
        favorites.indexOf(index);

    if (favoritePosition !== -1) {

        favorites.splice(
            favoritePosition,
            1
        );
    }


    // --------------------------------------------------------
    // Remove image
    // --------------------------------------------------------

    images.splice(
        index,
        1
    );


    // --------------------------------------------------------
    // Rebuild favorite indexes
    // --------------------------------------------------------

    favorites =
        favorites
            .map((favoriteIndex) => {

                if (
                    favoriteIndex > index
                ) {
                    return favoriteIndex - 1;
                }

                return favoriteIndex;
            })
            .filter((favoriteIndex) => {

                return (
                    favoriteIndex >= 0 &&
                    favoriteIndex < images.length
                );
            });


    saveFavorites();
    saveCustomImages();


    // --------------------------------------------------------
    // Fix current lightbox index
    // --------------------------------------------------------

    if (
        currentIndex >= images.length
    ) {

        currentIndex =
            Math.max(
                0,
                images.length - 1
            );
    }


    // --------------------------------------------------------
    // Rebuild gallery
    // --------------------------------------------------------

    renderGallery();

    updateImageCounts();

    updateFavoriteUI();


    showToast(
        `"${image.title}" deleted`
    );
}


// ============================================================
// GALLERY CLICK
// ============================================================

if (galleryGrid) {

    galleryGrid.addEventListener(
        "click",
        (event) => {

            const deleteButton =
                event.target.closest(
                    ".delete-image-btn"
                );

            if (deleteButton) {

                event.preventDefault();
                event.stopPropagation();

                const index =
                    Number(
                        deleteButton.dataset.index
                    );

                deleteCustomImage(index);

                return;
            }


            const favoriteButton =
                event.target.closest(
                    ".favorite-btn"
                );

            if (favoriteButton) {

                event.preventDefault();
                event.stopPropagation();

                const index =
                    Number(
                        favoriteButton.dataset.index
                    );

                toggleFavorite(index);

                return;
            }


            const item =
                event.target.closest(
                    ".gallery-item"
                );

            if (!item) {
                return;
            }

            const index =
                Number(item.dataset.index);

            openLightbox(index);
        }
    );
}


// ============================================================
// FILTER + SEARCH
// ============================================================

function applyFilters() {

    const searchTerm =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

    let visibleCount = 0;


    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    galleryItems.forEach((item) => {

        const index =
            Number(item.dataset.index);

        const image =
            images[index];

        if (!image) {
            return;
        }


        const category =
            image.category.toLowerCase();

        const title =
            image.title.toLowerCase();


        const matchesSearch =
            searchTerm === "" ||
            title.includes(searchTerm) ||
            category.includes(searchTerm);


        let matchesFilter = true;


        if (
            currentFilter !== "all" &&
            currentFilter !== "favorites"
        ) {

            matchesFilter =
                category ===
                currentFilter.toLowerCase();
        }


        if (
            currentFilter === "favorites"
        ) {

            matchesFilter =
                isFavorite(index);
        }


        const shouldShow =
            matchesSearch &&
            matchesFilter;


        item.classList.toggle(
            "hidden",
            !shouldShow
        );


        if (shouldShow) {
            visibleCount++;
        }
    });


    if (imageCount) {
        imageCount.textContent =
            visibleCount;
    }


    if (
        searchStatus &&
        searchResultText
    ) {

        if (searchTerm !== "") {

            searchStatus.style.display =
                "block";

            searchResultText.textContent =
                `${visibleCount} result${
                    visibleCount === 1
                        ? ""
                        : "s"
                } found for "${searchInput.value}"`;

        } else {

            searchStatus.style.display =
                "none";

            searchResultText.textContent =
                "";
        }
    }


    if (clearSearch) {

        clearSearch.classList.toggle(
            "visible",
            searchTerm !== ""
        );
    }


    if (noResults) {

        noResults.hidden =
            visibleCount !== 0;
    }
}


// ============================================================
// CATEGORY FILTER
// ============================================================

filterButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                (btn) => {
                    btn.classList.remove(
                        "active"
                    );
                }
            );


            button.classList.add(
                "active"
            );


            currentFilter =
                button.dataset.filter ||
                "all";


            applyFilters();
        }
    );
});


// ============================================================
// SEARCH
// ============================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {
            applyFilters();
        }
    );
}


// ============================================================
// CLEAR SEARCH
// ============================================================

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            if (searchInput) {

                searchInput.value =
                    "";

                applyFilters();

                searchInput.focus();
            }
        }
    );
}


// ============================================================
// RESET GALLERY
// ============================================================

if (resetGallery) {

    resetGallery.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            if (searchInput) {
                searchInput.value =
                    "";
            }


            currentFilter =
                "all";


            filterButtons.forEach(
                (button) => {

                    button.classList.remove(
                        "active"
                    );
                }
            );


            const allButton =
                document.querySelector(
                    '.filter-btn[data-filter="all"]'
                );


            if (allButton) {

                allButton.classList.add(
                    "active"
                );
            }


            applyFilters();


            const gallerySection =
                document.querySelector(
                    ".gallery-section"
                );


            if (gallerySection) {

                window.scrollTo({

                    top:
                        gallerySection.offsetTop -
                        80,

                    behavior:
                        "smooth"
                });
            }
        }
    );
}


// ============================================================
// FAVORITES HEADER BUTTON
// ============================================================

if (favoritesToggle) {

    favoritesToggle.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            currentFilter =
                "favorites";


            filterButtons.forEach(
                (button) => {

                    button.classList.remove(
                        "active"
                    );
                }
            );


            const favoritesButton =
                document.querySelector(
                    '.filter-btn[data-filter="favorites"]'
                );


            if (favoritesButton) {

                favoritesButton.classList.add(
                    "active"
                );
            }


            applyFilters();


            const gallerySection =
                document.querySelector(
                    ".gallery-section"
                );


            if (gallerySection) {

                gallerySection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    );
}


// ============================================================
// OPEN LIGHTBOX
// ============================================================

function openLightbox(index) {

    if (!images[index]) {
        return;
    }


    currentIndex =
        index;


    updateLightbox();


    if (lightbox) {

        lightbox.classList.add(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );
    }


    document.body.style.overflow =
        "hidden";


    updateSlideshowButton();
}


// ============================================================
// GET IMAGE DIMENSIONS
// ============================================================

function updateImageDimensions(image) {

    if (!lightboxDimensions) {
        return;
    }


    if (
        lightboxImage &&
        lightboxImage.naturalWidth > 0 &&
        lightboxImage.naturalHeight > 0
    ) {

        lightboxDimensions.textContent =
            `${lightboxImage.naturalWidth} × ${lightboxImage.naturalHeight}px`;

        return;
    }


    const tempImage =
        new Image();


    tempImage.onload = () => {

        if (currentIndex >= 0) {

            lightboxDimensions.textContent =
                `${tempImage.naturalWidth} × ${tempImage.naturalHeight}px`;
        }
    };


    tempImage.onerror = () => {

        lightboxDimensions.textContent =
            "Unavailable";
    };


    tempImage.src =
        image.src;
}


// ============================================================
// FORMAT FILE SIZE
// ============================================================

function formatFileSize(bytes) {

    if (!bytes || bytes <= 0) {
        return "Unknown";
    }


    const units = [
        "B",
        "KB",
        "MB",
        "GB"
    ];


    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    const safeIndex =
        Math.min(
            index,
            units.length - 1
        );


    return `${(
        bytes /
        Math.pow(
            1024,
            safeIndex
        )
    ).toFixed(1)} ${units[safeIndex]}`;
}


// ============================================================
// GET DATA URL SIZE
// ============================================================

function getDataUrlSize(dataUrl) {

    try {

        const base64 =
            dataUrl.split(",")[1];

        if (!base64) {
            return 0;
        }

        return Math.round(
            (base64.length * 3) / 4
        );

    } catch (error) {

        return 0;
    }
}


// ============================================================
// UPDATE FILE SIZE
// ============================================================

async function updateImageFileSize(image) {

    if (!lightboxFileSize) {
        return;
    }


    // Custom uploaded image
    if (
        image.src &&
        image.src.startsWith("data:")
    ) {

        const bytes =
            getDataUrlSize(
                image.src
            );

        lightboxFileSize.textContent =
            formatFileSize(bytes);

        return;
    }


    lightboxFileSize.textContent =
        "Loading...";


    try {

        const response =
            await fetch(
                image.src,
                {
                    method: "HEAD"
                }
            );


        if (
            response.ok
        ) {

            const length =
                response.headers.get(
                    "content-length"
                );


            if (length) {

                lightboxFileSize.textContent =
                    formatFileSize(
                        Number(length)
                    );

                return;
            }
        }


        lightboxFileSize.textContent =
            "Unknown";

    } catch (error) {

        lightboxFileSize.textContent =
            "Unknown";
    }
}


// ============================================================
// UPDATE ADDED DATE
// ============================================================

function updateAddedInfo(image) {

    if (!lightboxAdded) {
        return;
    }


    if (
        image.custom &&
        image.addedAt
    ) {

        const date =
            new Date(
                image.addedAt
            );


        if (
            !Number.isNaN(
                date.getTime()
            )
        ) {

            lightboxAdded.textContent =
                date.toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );

            return;
        }


        lightboxAdded.textContent =
            image.addedAt;

        return;
    }


    lightboxAdded.textContent =
        "Gallery Collection";
}


// ============================================================
// UPDATE LIGHTBOX
// ============================================================

function updateLightbox() {

    const image =
        images[currentIndex];


    if (!image) {
        return;
    }


    // --------------------------------------------------------
    // Stop old slideshow transition
    // --------------------------------------------------------

    if (lightboxImage) {

        lightboxImage.style.opacity =
            "0";
    }


    // --------------------------------------------------------
    // Update text immediately
    // --------------------------------------------------------

    if (lightboxCategory) {

        lightboxCategory.textContent =
            image.category;
    }


    if (lightboxTitle) {

        lightboxTitle.textContent =
            image.title;
    }


    if (currentImage) {

        currentImage.textContent =
            currentIndex + 1;
    }


    if (totalImages) {

        totalImages.textContent =
            images.length;
    }


    updateFavoriteUI();

    updateAddedInfo(image);


    // --------------------------------------------------------
    // Load image
    // --------------------------------------------------------

    if (lightboxImage) {

        const newImage =
            new Image();


        newImage.onload = () => {

            lightboxImage.src =
                image.src;

            lightboxImage.alt =
                image.title;

            lightboxImage.style.opacity =
                "1";


            if (lightboxDimensions) {

                lightboxDimensions.textContent =
                    `${newImage.naturalWidth} × ${newImage.naturalHeight}px`;
            }
        };


        newImage.onerror = () => {

            lightboxImage.src =
                image.src;

            lightboxImage.alt =
                image.title;

            lightboxImage.style.opacity =
                "1";


            if (lightboxDimensions) {

                lightboxDimensions.textContent =
                    "Unavailable";
            }
        };


        newImage.src =
            image.src;
    }


    updateImageFileSize(
        image
    );
}


// ============================================================
// CLOSE LIGHTBOX
// ============================================================

function closeGallery() {

    if (!lightbox) {
        return;
    }


    stopSlideshow();


    lightbox.classList.remove(
        "active"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";
}


if (closeLightbox) {

    closeLightbox.addEventListener(
        "click",
        closeGallery
    );
}


// ============================================================
// NEXT IMAGE
// ============================================================

function showNextImage() {

    if (!images.length) {
        return;
    }


    currentIndex =
        (currentIndex + 1) %
        images.length;


    updateLightbox();
}


// ============================================================
// PREVIOUS IMAGE
// ============================================================

function showPreviousImage() {

    if (!images.length) {
        return;
    }


    currentIndex =
        (
            currentIndex -
            1 +
            images.length
        ) %
        images.length;


    updateLightbox();
}


if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            showNextImage();
        }
    );
}


if (prevBtn) {

    prevBtn.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            showPreviousImage();
        }
    );
}


// ============================================================
// LIGHTBOX FAVORITE
// ============================================================

if (lightboxFavorite) {

    lightboxFavorite.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            toggleFavorite(
                currentIndex
            );

            updateFavoriteUI();
        }
    );
}


// ============================================================
// DOWNLOAD IMAGE
// ============================================================

if (downloadImage) {

    downloadImage.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();

            event.stopPropagation();


            const image =
                images[currentIndex];


            if (!image) {
                return;
            }


            const safeFileName =
                image.title
                    .toLowerCase()
                    .replace(
                        /[^a-z0-9]+/g,
                        "-"
                    )
                    .replace(
                        /^-+|-+$/g,
                        ""
                    ) ||
                "vistora-image";


            try {

                // ------------------------------------------------
                // Local custom image
                // ------------------------------------------------

                if (
                    image.src.startsWith(
                        "data:"
                    )
                ) {

                    const link =
                        document.createElement(
                            "a"
                        );


                    link.href =
                        image.src;


                    link.download =
                        `${safeFileName}.jpg`;


                    document.body.appendChild(
                        link
                    );


                    link.click();


                    link.remove();


                    showToast(
                        "Image download started"
                    );


                    return;
                }


                // ------------------------------------------------
                // Online image
                // ------------------------------------------------

                const response =
                    await fetch(
                        image.src
                    );


                if (!response.ok) {
                    throw new Error(
                        "Download failed"
                    );
                }


                const blob =
                    await response.blob();


                const url =
                    URL.createObjectURL(
                        blob
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    url;


                link.download =
                    `${safeFileName}.jpg`;


                document.body.appendChild(
                    link
                );


                link.click();


                link.remove();


                setTimeout(() => {

                    URL.revokeObjectURL(
                        url
                    );

                }, 1000);


                showToast(
                    "Image download started"
                );

            } catch (error) {

                console.error(
                    "Download error:",
                    error
                );


                window.open(
                    image.src,
                    "_blank"
                );


                showToast(
                    "Opening image in new tab"
                );
            }
        }
    );
}


// ============================================================
// SHARE IMAGE
// ============================================================

if (shareImage) {

    shareImage.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();

            event.stopPropagation();


            const image =
                images[currentIndex];


            if (!image) {
                return;
            }


            const shareData = {

                title:
                    `Vistora - ${image.title}`,

                text:
                    `Check out "${image.title}" on Vistora.`
            };


            if (
                window.location.protocol !==
                "file:"
            ) {

                shareData.url =
                    window.location.href;
            }


            try {

                if (
                    navigator.share &&
                    window.isSecureContext
                ) {

                    await navigator.share(
                        shareData
                    );


                    showToast(
                        "Image shared successfully!"
                    );


                    return;
                }


                const text =
                    shareData.url
                        ? `${shareData.text} ${shareData.url}`
                        : shareData.text;


                if (
                    navigator.clipboard &&
                    window.isSecureContext
                ) {

                    await navigator.clipboard.writeText(
                        text
                    );

                } else {

                    const textArea =
                        document.createElement(
                            "textarea"
                        );


                    textArea.value =
                        text;


                    textArea.style.position =
                        "fixed";


                    textArea.style.left =
                        "-9999px";


                    document.body.appendChild(
                        textArea
                    );


                    textArea.select();


                    document.execCommand(
                        "copy"
                    );


                    textArea.remove();
                }


                showToast(
                    "Image details copied!"
                );

            } catch (error) {

                if (
                    error &&
                    error.name ===
                    "AbortError"
                ) {
                    return;
                }


                console.error(
                    "Share error:",
                    error
                );


                showToast(
                    "Unable to share this image"
                );
            }
        }
    );
}


// ============================================================
// FULLSCREEN
// ============================================================

if (fullscreenImage) {

    fullscreenImage.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();

            event.stopPropagation();


            try {

                if (
                    !document.fullscreenElement
                ) {

                    if (
                        lightbox &&
                        lightbox.requestFullscreen
                    ) {

                        await lightbox.requestFullscreen();

                    } else if (
                        lightboxImage &&
                        lightboxImage.requestFullscreen
                    ) {

                        await lightboxImage.requestFullscreen();

                    } else {

                        showToast(
                            "Fullscreen is not supported"
                        );

                        return;
                    }


                    showToast(
                        "Fullscreen enabled"
                    );

                } else {

                    await document.exitFullscreen();

                    showToast(
                        "Fullscreen closed"
                    );
                }

            } catch (error) {

                console.error(
                    "Fullscreen error:",
                    error
                );


                showToast(
                    "Fullscreen is not available"
                );
            }
        }
    );
}


// ============================================================
// SLIDESHOW
// SINGLE BUTTON VERSION
// ============================================================

function createSlideshowControls() {

    if (!lightbox) {
        return;
    }


    const lightboxActions =
        lightbox.querySelector(
            ".lightbox-actions"
        );


    if (!lightboxActions) {
        return;
    }


    // --------------------------------------------------------
    // Remove old dynamically created slideshow buttons
    // --------------------------------------------------------

    const oldButtons =
        lightboxActions.querySelectorAll(
            ".slideshow-btn, .slideshow-play-btn"
        );


    oldButtons.forEach((button) => {
        button.remove();
    });


    // --------------------------------------------------------
    // Create ONE slideshow button
    // --------------------------------------------------------

    slideshowButton =
        document.createElement(
            "button"
        );


    slideshowButton.type =
        "button";


    slideshowButton.className =
        "lightbox-action slideshow-btn";


    slideshowButton.innerHTML =
        "▶️";


    slideshowButton.setAttribute(
        "title",
        "Start slideshow"
    );


    slideshowButton.setAttribute(
        "aria-label",
        "Start slideshow"
    );


    lightboxActions.appendChild(
        slideshowButton
    );


    // --------------------------------------------------------
    // Button click
    // --------------------------------------------------------

    slideshowButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();


            if (slideshowPlaying) {

                stopSlideshow();

            } else {

                startSlideshow();
            }
        }
    );


    updateSlideshowButton();
}


// ============================================================
// START SLIDESHOW
// ============================================================

function startSlideshow() {

    if (!lightbox) {
        return;
    }


    if (
        !lightbox.classList.contains(
            "active"
        )
    ) {

        showToast(
            "Open an image first"
        );

        return;
    }


    // Clear previous timer
    stopSlideshow(false);


    slideshowPlaying =
        true;


    updateSlideshowButton();


    showToast(
        "Slideshow started"
    );


    // --------------------------------------------------------
    // Start timer
    // --------------------------------------------------------

    slideshowTimer =
        setInterval(() => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {

                stopSlideshow();

                return;
            }


            showNextImage();

        }, SLIDESHOW_INTERVAL);
}


// ============================================================
// STOP SLIDESHOW
// ============================================================

function stopSlideshow(showMessage = false) {

    if (slideshowTimer !== null) {

        clearInterval(
            slideshowTimer
        );

        slideshowTimer =
            null;
    }


    const wasPlaying =
        slideshowPlaying;


    slideshowPlaying =
        false;


    updateSlideshowButton();


    if (
        showMessage &&
        wasPlaying
    ) {

        showToast(
            "Slideshow stopped"
        );
    }
}


// ============================================================
// TOGGLE SLIDESHOW
// ============================================================

function toggleSlideshow() {

    if (slideshowPlaying) {

        stopSlideshow(
            true
        );

    } else {

        startSlideshow();
    }
}


// ============================================================
// UPDATE SLIDESHOW BUTTON
// ============================================================

function updateSlideshowButton() {

    if (!slideshowButton) {
        return;
    }


    if (slideshowPlaying) {

        slideshowButton.innerHTML =
            "⏸️";


        slideshowButton.setAttribute(
            "title",
            "Pause slideshow"
        );


        slideshowButton.setAttribute(
            "aria-label",
            "Pause slideshow"
        );


        slideshowButton.classList.add(
            "playing"
        );

    } else {

        slideshowButton.innerHTML =
            "▶️";


        slideshowButton.setAttribute(
            "title",
            "Start slideshow"
        );


        slideshowButton.setAttribute(
            "aria-label",
            "Start slideshow"
        );


        slideshowButton.classList.remove(
            "playing"
        );
    }
}


// ============================================================
// THEME
// ============================================================

function updateThemeIcon() {

    if (
        !themeIcon ||
        !themeToggle
    ) {
        return;
    }


    const isLight =
        document.body.classList.contains(
            "light-theme"
        );


    if (isLight) {

        themeIcon.textContent =
            "☾";


        themeToggle.setAttribute(
            "title",
            "Switch to dark theme"
        );

    } else {

        themeIcon.textContent =
            "☀";


        themeToggle.setAttribute(
            "title",
            "Switch to light theme"
        );
    }
}


// ============================================================
// LOAD SAVED THEME
// ============================================================

try {

    const savedTheme =
        localStorage.getItem(
            "vistoraTheme"
        );


    if (
        savedTheme === "light"
    ) {

        document.body.classList.add(
            "light-theme"
        );
    }

} catch (error) {

    console.error(
        "Unable to load theme:",
        error
    );
}


updateThemeIcon();


// ============================================================
// THEME TOGGLE
// ============================================================

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            document.body.classList.toggle(
                "light-theme"
            );


            const isLight =
                document.body.classList.contains(
                    "light-theme"
                );


            try {

                localStorage.setItem(
                    "vistoraTheme",
                    isLight
                        ? "light"
                        : "dark"
                );

            } catch (error) {

                console.error(
                    "Unable to save theme:",
                    error
                );
            }


            updateThemeIcon();


            showToast(
                isLight
                    ? "Light theme enabled"
                    : "Dark theme enabled"
            );
        }
    );
}


// ============================================================
// ADD IMAGE MODAL
// ============================================================

function openAddImageModal() {

    if (!addImageModal) {
        return;
    }


    addImageModal.classList.add(
        "active"
    );


    addImageModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );


    setTimeout(() => {

        if (imageTitleInput) {

            imageTitleInput.focus();
        }

    }, 100);
}


// ============================================================
// CLOSE ADD IMAGE MODAL
// ============================================================

function closeAddImageModal() {

    if (!addImageModal) {
        return;
    }


    addImageModal.classList.remove(
        "active"
    );


    addImageModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );


    resetAddImageForm();
}


// ============================================================
// RESET ADD IMAGE FORM
// ============================================================

function resetAddImageForm() {

    selectedImageData =
        "";


    if (imageFileInput) {

        imageFileInput.value =
            "";
    }


    if (imageTitleInput) {

        imageTitleInput.value =
            "";
    }


    if (imageCategoryInput) {

        imageCategoryInput.value =
            "Nature";
    }


    if (imagePreview) {

        imagePreview.src =
            "";
    }


    if (imagePreviewContainer) {

        imagePreviewContainer.hidden =
            true;
    }


    if (uploadPlaceholder) {

        uploadPlaceholder.hidden =
            false;
    }
}


// ============================================================
// OPEN ADD IMAGE
// ============================================================

if (openAddImage) {

    openAddImage.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            openAddImageModal();
        }
    );
}


// ============================================================
// CLOSE ADD IMAGE
// ============================================================

if (closeAddImage) {

    closeAddImage.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            closeAddImageModal();
        }
    );
}


// ============================================================
// CANCEL ADD IMAGE
// ============================================================

if (cancelAddImage) {

    cancelAddImage.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            closeAddImageModal();
        }
    );
}


// ============================================================
// MODAL BACKDROP
// ============================================================

if (addImageBackdrop) {

    addImageBackdrop.addEventListener(
        "click",
        closeAddImageModal
    );
}


// ============================================================
// IMAGE PICKER
// ============================================================

function triggerImagePicker() {

    if (imageFileInput) {

        imageFileInput.click();
    }
}


if (chooseImageBtn) {

    chooseImageBtn.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();

            triggerImagePicker();
        }
    );
}


if (uploadArea) {

    uploadArea.addEventListener(
        "click",
        (event) => {

            if (
                event.target.closest(
                    "#chooseImageBtn"
                ) ||
                event.target.closest(
                    "#removeImagePreview"
                )
            ) {
                return;
            }


            triggerImagePicker();
        }
    );
}


// ============================================================
// IMAGE FILE SELECT
// ============================================================

if (imageFileInput) {

    imageFileInput.addEventListener(
        "change",
        (event) => {

            const file =
                event.target.files &&
                event.target.files[0];


            if (!file) {
                return;
            }


            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];


            if (
                !allowedTypes.includes(
                    file.type
                )
            ) {

                showToast(
                    "Please select JPG, PNG or WEBP image."
                );


                imageFileInput.value =
                    "";


                return;
            }


            const maxSize =
                1.5 * 1024 * 1024;


            if (
                file.size > maxSize
            ) {

                showToast(
                    "Image must be smaller than 1.5 MB."
                );


                imageFileInput.value =
                    "";


                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                (loadEvent) => {

                    selectedImageData =
                        loadEvent.target.result;


                    if (imagePreview) {

                        imagePreview.src =
                            selectedImageData;
                    }


                    if (imagePreviewContainer) {

                        imagePreviewContainer.hidden =
                            false;
                    }


                    if (uploadPlaceholder) {

                        uploadPlaceholder.hidden =
                            true;
                    }
                };


            reader.onerror = () => {

                showToast(
                    "Unable to read this image."
                );
            };


            reader.readAsDataURL(
                file
            );
        }
    );
}


// ============================================================
// REMOVE IMAGE PREVIEW
// ============================================================

if (removeImagePreview) {

    removeImagePreview.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            event.stopPropagation();


            selectedImageData =
                "";


            if (imageFileInput) {

                imageFileInput.value =
                    "";
            }


            if (imagePreview) {

                imagePreview.src =
                    "";
            }


            if (imagePreviewContainer) {

                imagePreviewContainer.hidden =
                    true;
            }


            if (uploadPlaceholder) {

                uploadPlaceholder.hidden =
                    false;
            }
        }
    );
}


// ============================================================
// ADD NEW IMAGE
// ============================================================

if (confirmAddImage) {

    confirmAddImage.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            if (!selectedImageData) {

                showToast(
                    "Please choose an image first."
                );

                return;
            }


            const title =
                imageTitleInput
                    ? imageTitleInput.value.trim()
                    : "";


            if (!title) {

                showToast(
                    "Please enter an image title."
                );


                if (imageTitleInput) {
                    imageTitleInput.focus();
                }


                return;
            }


            const category =
                imageCategoryInput
                    ? imageCategoryInput.value
                    : "Nature";


            const newImage = {

                src:
                    selectedImageData,

                category:
                    category,

                title:
                    title,

                custom:
                    true,

                addedAt:
                    new Date().toISOString()
            };


            images.push(
                newImage
            );


            saveCustomImages();


            // Rebuild complete gallery
            renderGallery();


            updateImageCounts();

            updateFavoriteUI();


            // Close modal
            closeAddImageModal();


            // Reset filter
            currentFilter =
                "all";


            filterButtons.forEach(
                (button) => {

                    button.classList.remove(
                        "active"
                    );
                }
            );


            const allButton =
                document.querySelector(
                    '.filter-btn[data-filter="all"]'
                );


            if (allButton) {

                allButton.classList.add(
                    "active"
                );
            }


            if (searchInput) {

                searchInput.value =
                    "";
            }


            applyFilters();


            // Scroll to new image
            setTimeout(() => {

                const newItem =
                    document.querySelector(
                        `.gallery-item[data-index="${images.length - 1}"]`
                    );


                if (newItem) {

                    newItem.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }

            }, 150);


            showToast(
                `"${title}" added to your gallery`
            );
        }
    );
}


// ============================================================
// KEYBOARD CONTROLS
// ============================================================

document.addEventListener(
    "keydown",
    (event) => {

        const typing =
            event.target &&
            (
                event.target.tagName ===
                    "INPUT" ||
                event.target.tagName ===
                    "TEXTAREA" ||
                event.target.tagName ===
                    "SELECT"
            );


        // ----------------------------------------------------
        // Escape
        // ----------------------------------------------------

        if (
            event.key === "Escape"
        ) {

            if (
                addImageModal &&
                addImageModal.classList.contains(
                    "active"
                )
            ) {

                closeAddImageModal();

                return;
            }


            if (
                lightbox &&
                lightbox.classList.contains(
                    "active"
                )
            ) {

                closeGallery();

                return;
            }
        }


        // Don't run gallery shortcuts while typing
        if (typing) {
            return;
        }


        // ----------------------------------------------------
        // Lightbox controls
        // ----------------------------------------------------

        if (
            lightbox &&
            lightbox.classList.contains(
                "active"
            )
        ) {

            if (
                event.key ===
                "ArrowRight"
            ) {

                event.preventDefault();

                showNextImage();

                return;
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                event.preventDefault();

                showPreviousImage();

                return;
            }


            if (
                event.key.toLowerCase() ===
                "f"
            ) {

                event.preventDefault();

                toggleFavorite(
                    currentIndex
                );

                return;
            }


            // Spacebar = slideshow
            if (
                event.code ===
                "Space"
            ) {

                event.preventDefault();

                toggleSlideshow();

                return;
            }
        }
    }
);


// ============================================================
// CLICK OUTSIDE LIGHTBOX IMAGE
// ============================================================

if (lightbox) {

    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                lightbox
            ) {

                closeGallery();
            }
        }
    );
}


// ============================================================
// VISIBILITY CHANGE
// Stop slideshow when browser tab is hidden
// ============================================================

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden &&
            slideshowPlaying
        ) {

            stopSlideshow();
        }
    }
);


// ============================================================
// INITIALIZE
// ============================================================

updateImageCounts();

renderGallery();

updateFavoriteUI();

applyFilters();

createSlideshowControls();


// ============================================================
// FINAL LOG
// ============================================================

console.log(
    "Vistora Image Gallery loaded successfully."
);