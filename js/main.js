/**
 * Main module for application initialization and state management
 */

import { fetchItems } from './api.js';
import * as ui from './ui.js';

let appData = []; // Store fetched data locally
let filteredData = []; // Store currently filtered data

/**
 * Initializes the application
 */
async function init() {
    setupThemeToggle();
    setupEventListeners();

    ui.showLoading();

    try {
        appData = await fetchItems();
        filteredData = [...appData];

        // Initialize UI with fetched data
        ui.hideLoading();
        ui.renderCategoryFilter(appData);
        ui.renderItems(filteredData, handleCardClick);

    } catch (error) {
        ui.showError('Failed to load projects. Please try again later.');
    }
}

/**
 * Sets up event listeners for interactive elements
 */
function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const modal = document.getElementById('details-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // Search filter logic
    searchInput.addEventListener('input', (e) => {
        handleFilters(e.target.value.toLowerCase(), categoryFilter.value);
    });

    // Category filter logic
    categoryFilter.addEventListener('change', (e) => {
        handleFilters(searchInput.value.toLowerCase(), e.target.value);
    });

    // Modal Close logic
    closeModalBtn.addEventListener('click', ui.closeModal);

    // Close modal on click outside
    modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            ui.closeModal();
        }
    });
}

/**
 * Handles filtering logic based on search and category inputs
 * @param {string} searchTerm
 * @param {string} category
 */
function handleFilters(searchTerm, category) {
    filteredData = appData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm) ||
                              item.description.toLowerCase().includes(searchTerm);

        const matchesCategory = category === 'all' || item.category === category;

        return matchesSearch && matchesCategory;
    });

    ui.renderItems(filteredData, handleCardClick);
}

/**
 * Handles clicks on individual item cards
 * @param {Object} item Data of the clicked item
 */
function handleCardClick(item) {
    ui.openModal(item);
}

/**
 * Handles Dark/Light theme toggling and persistence
 */
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('.theme-icon');

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌗';
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');

        if (isDark) {
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = '🌗';
        }
    });
}

// Run init when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
