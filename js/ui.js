/**
 * UI Module for DOM manipulation and rendering
 */

const container = document.getElementById('data-container');
const categoryFilter = document.getElementById('category-filter');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMsg = document.getElementById('error-message');
const modal = document.getElementById('details-modal');
const modalBody = document.getElementById('modal-body');

let observer; // Store IntersectionObserver instance

/**
 * Shows the loading spinner
 */
export function showLoading() {
    loadingSpinner.classList.remove('hidden');
    container.innerHTML = '';
    errorMsg.classList.add('hidden');
}

/**
 * Hides the loading spinner
 */
export function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

/**
 * Shows a user-friendly error message
 * @param {string} message The error message to display
 */
export function showError(message) {
    hideLoading();
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
    container.innerHTML = '';
}

/**
 * Populates the category filter dropdown dynamically based on fetched items
 * @param {Array} items
 */
export function renderCategoryFilter(items) {
    const categories = ['all', ...new Set(items.map(item => item.category))];

    // Clear existing options
    categoryFilter.innerHTML = '';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category === 'all' ? 'All Categories' : (category.charAt(0).toUpperCase() + category.slice(1));
        categoryFilter.appendChild(option);
    });
}

/**
 * Renders the items as HTML cards inside the container
 * @param {Array} items
 * @param {Function} onCardClick Callback when a card is clicked
 */
export function renderItems(items, onCardClick) {
    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = '<p>No items found matching your criteria.</p>';
        return;
    }

    const fragment = document.createDocumentFragment();

    items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card fade-in';
        card.setAttribute('aria-labelledby', `item-title-${item.id}`);
        // Make entire card interactive via keyboard or click for modal access
        card.setAttribute('tabindex', '0');

        // Add click listener and keyboard listener to open modal
        card.addEventListener('click', () => onCardClick(item));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCardClick(item);
            }
        });

        // Truncate description for card preview
        const shortDesc = item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description;

        card.innerHTML = `
            <div class="card-image-container">
                <img src="${item.image}" alt="Preview of ${item.title}" class="card-image" loading="lazy">
            </div>
            <div class="card-content">
                <span class="card-category">${item.category}</span>
                <h2 id="item-title-${item.id}" class="card-title">${item.title}</h2>
                <p class="card-text">${shortDesc}</p>
                <button class="cta-button" style="align-self: flex-start; margin-top: auto;" aria-label="Read more about ${item.title}">Details</button>
            </div>
        `;

        fragment.appendChild(card);
    });

    container.appendChild(fragment);

    // Setup intersection observer for new cards
    setupIntersectionObserver();
}

/**
 * Sets up Intersection Observer for scroll animations
 */
function setupIntersectionObserver() {
    // Re-initialize observer if it exists
    if (observer) {
        observer.disconnect();
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, options);

    const elementsToObserve = document.querySelectorAll('.fade-in');
    elementsToObserve.forEach(el => observer.observe(el));
}

/**
 * Opens the dialog modal and populates it with item data
 * @param {Object} item
 */
export function openModal(item) {
    modalBody.innerHTML = `
        <span class="modal-category">${item.category}</span>
        <h2 class="modal-title">${item.title}</h2>
        <img src="${item.image}" alt="${item.title}" class="modal-image">
        <p class="modal-description">${item.description}</p>
        <p class="modal-price">$${item.price.toFixed(2)}</p>
    `;
    modal.showModal();
}

/**
 * Closes the dialog modal
 */
export function closeModal() {
    modal.close();
}
