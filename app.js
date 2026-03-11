// Mock Project Data
const projects = [
    {
        title: "E-Commerce Platform",
        description: "A full-stack online store with a shopping cart, user authentication, and payment integration.",
        imageUrl: "https://via.placeholder.com/400x200/3498db/ffffff?text=E-Commerce"
    },
    {
        title: "Social Media Dashboard",
        description: "A responsive dashboard for tracking social media metrics with real-time data visualization.",
        imageUrl: "https://via.placeholder.com/400x200/2ecc71/ffffff?text=Social+Dashboard"
    },
    {
        title: "Weather Application",
        description: "A location-based weather app providing current conditions and 5-day forecasts using a third-party API.",
        imageUrl: "https://via.placeholder.com/400x200/f39c12/ffffff?text=Weather+App"
    },
    {
        title: "Task Management Tool",
        description: "A productivity app with drag-and-drop kanban boards, task assignments, and progress tracking.",
        imageUrl: "https://via.placeholder.com/400x200/9b59b6/ffffff?text=Task+Manager"
    }
];

// Function to render projects dynamically
function renderProjects() {
    const container = document.getElementById('projects-container');

    if (!container) return;

    // Clear existing content if any
    container.innerHTML = '';

    projects.forEach(project => {
        // Create card element
        const card = document.createElement('article');
        card.className = 'project-card';

        // Create image element
        const img = document.createElement('img');
        img.src = project.imageUrl;
        img.alt = project.title;
        img.className = 'project-image';
        img.loading = 'lazy'; // Add lazy loading for performance

        // Create info container
        const info = document.createElement('div');
        info.className = 'project-info';

        // Create title
        const title = document.createElement('h3');
        title.className = 'project-title';
        title.textContent = project.title;

        // Create description
        const desc = document.createElement('p');
        desc.className = 'project-description';
        desc.textContent = project.description;

        // Assemble the card
        info.appendChild(title);
        info.appendChild(desc);
        card.appendChild(img);
        card.appendChild(info);

        // Add to container
        container.appendChild(card);
    });
}

// Dark/Light Mode Toggle Logic
function setupThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const STORAGE_KEY = 'user-theme-preference';

    if (!toggleButton) return;

    // Check for saved preference or OS preference
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        updateToggleButtonText(true);
    } else {
        updateToggleButtonText(false);
    }

    // Toggle event listener
    toggleButton.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-mode');
        localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
        updateToggleButtonText(isDark);
    });

    function updateToggleButtonText(isDark) {
        toggleButton.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        toggleButton.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position to account for sticky header
                const headerOffset = document.querySelector('header').offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    setupThemeToggle();
    setupSmoothScrolling();
});
