/**
 * Portfolio Data
 * Array of 6 mock portfolio projects
 */
const projects = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        category: 'Web Development',
        text: 'A full-stack e-commerce solution with real-time inventory and seamless checkout process.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 2,
        title: 'Financial Dashboard',
        category: 'Data Visualization',
        text: 'Interactive dashboard for tracking financial metrics, featuring dynamic charts and custom reporting.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 3,
        title: 'Task Management App',
        category: 'Mobile Application',
        text: 'A cross-platform mobile application designed to boost productivity with intuitive task management.',
        image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 4,
        title: 'Real Estate Portal',
        category: 'UI/UX Design',
        text: 'Modern user interface design for a real estate platform focused on seamless property discovery.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 5,
        title: 'AI Image Generator',
        category: 'Machine Learning',
        text: 'An application leveraging deep learning models to generate high-quality images from text descriptions.',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 6,
        title: 'Social Network Analytics',
        category: 'Data Science',
        text: 'Comprehensive analytics tool for social media managers to track engagement and sentiment analysis.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    }
];

/**
 * DOM Elements Selection
 */
const projectsGrid = document.getElementById('projects-grid');
const themeToggleBtn = document.getElementById('theme-toggle');
const currentYearSpan = document.getElementById('current-year');

/**
 * Render Projects
 * Injects project data as HTML cards into the DOM
 */
const renderProjects = () => {
    projectsGrid.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('article');
        card.classList.add('card');
        card.setAttribute('role', 'listitem');
        card.setAttribute('aria-labelledby', `project-title-${project.id}`);

        card.innerHTML = `
            <div class="card-image-container">
                <img src="${project.image}" alt="Screenshot of ${project.title}" class="card-image" loading="lazy">
            </div>
            <div class="card-content">
                <span class="card-category" aria-hidden="true">${project.category}</span>
                <h3 class="card-title" id="project-title-${project.id}">${project.title}</h3>
                <p class="card-text">${project.text}</p>
            </div>
        `;

        projectsGrid.appendChild(card);
    });
};

/**
 * Intersection Observer for scroll animations
 * Adds fade-in effect when cards enter the viewport
 */
const setupIntersectionObserver = () => {
    const cards = document.querySelectorAll('.card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the card is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve once visible to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
};

/**
 * Theme Toggle Logic
 * Handles switching between Light and Dark mode, saving preference to localStorage
 */
const setupThemeToggle = () => {
    // Check for saved theme in localStorage or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        themeToggleBtn.setAttribute('aria-pressed', 'true');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');

        // Update ARIA attribute
        themeToggleBtn.setAttribute('aria-pressed', isDark);

        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
};

/**
 * Initialize Application
 */
const init = () => {
    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    renderProjects();
    setupThemeToggle();

    // Ensure the DOM is fully painted before setting up the observer
    requestAnimationFrame(() => {
        setupIntersectionObserver();
    });
};

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
