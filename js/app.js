// Constants
const THEME_STORAGE_KEY = 'theme_preference';
const DATA_CONTAINER_ID = 'data-container';
const THEME_TOGGLE_ID = 'theme-toggle';
const DARK_THEME_CLASS = 'dark-theme';

// Mock Data
const projects = [
    {
        id: 1,
        category: 'Web Application',
        title: 'E-Commerce Dashboard',
        text: 'A full-featured dashboard for managing online store sales and inventory.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Dashboard analytics display on a computer screen'
    },
    {
        id: 2,
        category: 'Mobile App',
        title: 'Fitness Tracker',
        text: 'A cross-platform mobile application to track daily workouts and nutrition.',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Fitness equipment at a gym'
    },
    {
        id: 3,
        category: 'UI/UX Design',
        title: 'Travel Agency Redesign',
        text: 'A complete overhaul of a legacy travel booking website with modern UX principles.',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Airplane flying in the sky'
    },
    {
        id: 4,
        category: 'Data Visualization',
        title: 'Climate Impact Map',
        text: 'Interactive maps showing the effects of climate change over the last century.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Globe showing Earth from space'
    },
    {
        id: 5,
        category: 'Open Source',
        title: 'React Component Library',
        text: 'A lightweight, accessible UI component library built for React developers.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Code snippet displayed on a monitor'
    },
    {
        id: 6,
        category: 'E-Learning',
        title: 'Code Bootcamp Platform',
        text: 'An interactive learning management system for aspiring software engineers.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Laptop sitting on a desk with notebooks'
    }
];

// Theme Management
const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Determine initial theme
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    // Apply theme
    document.documentElement.classList.toggle(DARK_THEME_CLASS, isDark);

    // Update ARIA pressed state on toggle button
    const toggleBtn = document.getElementById(THEME_TOGGLE_ID);
    if (toggleBtn) {
        toggleBtn.setAttribute('aria-pressed', isDark);
        updateToggleIcon(isDark);
    }
};

const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle(DARK_THEME_CLASS);

    const isDark = html.classList.contains(DARK_THEME_CLASS);

    // Save preference
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');

    // Update button state
    const toggleBtn = document.getElementById(THEME_TOGGLE_ID);
    if (toggleBtn) {
        toggleBtn.setAttribute('aria-pressed', isDark);
        updateToggleIcon(isDark);
    }
};

const updateToggleIcon = (isDark) => {
    const iconSpan = document.querySelector('#theme-toggle .icon');
    if (iconSpan) {
        iconSpan.textContent = isDark ? '☀️' : '🌓';
    }
};

// Rendering Data
const createCardElement = (project) => {
    const card = document.createElement('article');
    card.classList.add('card');
    card.setAttribute('aria-labelledby', `card-title-${project.id}`);

    card.innerHTML = `
        <img src="${project.image}" alt="${project.alt}" class="card-image" loading="lazy">
        <div class="card-content">
            <span class="card-category" aria-hidden="true">${project.category}</span>
            <h2 id="card-title-${project.id}" class="card-title">${project.title}</h2>
            <p class="card-text">${project.text}</p>
        </div>
    `;

    return card;
};

const renderProjects = () => {
    const container = document.getElementById(DATA_CONTAINER_ID);
    if (!container) return;

    // Clear container (although it should be empty initially)
    container.innerHTML = '';

    // Document Fragment for performance
    const fragment = document.createDocumentFragment();

    projects.forEach(project => {
        const card = createCardElement(project);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);

    // Initialize Intersection Observer after adding cards to the DOM
    initIntersectionObserver();
};

// Intersection Observer for scroll animations
const initIntersectionObserver = () => {
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS animation
                entry.target.classList.add('visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => observer.observe(card));
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();

    // Render projects
    renderProjects();

    // Attach event listeners
    const themeToggleBtn = document.getElementById(THEME_TOGGLE_ID);
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
});
