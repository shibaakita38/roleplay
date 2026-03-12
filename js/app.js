// Mock Data
const projects = [
    {
        id: 1,
        title: "E-commerce Platform",
        category: "Web Development",
        description: "A full-featured online store with seamless checkout and inventory management.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
        altText: "Customer paying with a credit card at a terminal"
    },
    {
        id: 2,
        title: "Financial Dashboard",
        category: "Data Visualization",
        description: "Interactive analytics dashboard providing real-time insights for financial institutions.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        altText: "Screen showing financial charts and graphs"
    },
    {
        id: 3,
        title: "Health Tracker App",
        category: "Mobile App",
        description: "A comprehensive health and fitness tracking application for iOS and Android.",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80",
        altText: "Person using a smartphone while exercising"
    },
    {
        id: 4,
        title: "Smart Home Controller",
        category: "IoT",
        description: "Centralized hub interface for managing smart home devices and energy consumption.",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
        altText: "Smart home application on a tablet"
    },
    {
        id: 5,
        title: "Social Media Campaign",
        category: "Marketing",
        description: "Strategic digital marketing campaign that increased brand engagement by 200%.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
        altText: "Social media icons displayed on a screen"
    },
    {
        id: 6,
        title: "AI Writing Assistant",
        category: "Artificial Intelligence",
        description: "Machine learning powered tool that helps writers improve their grammar and style.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
        altText: "Abstract representation of artificial intelligence"
    }
];

// DOM Elements
const dataContainer = document.getElementById('data-container');
const themeToggleBtn = document.getElementById('theme-toggle');
const lightIcon = document.querySelector('.light-icon');
const darkIcon = document.querySelector('.dark-icon');

// Theme Management
const THEME_KEY = 'portfolio-theme';

function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    // Default to dark mode if preference matches, or if saved as dark
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-theme');
        updateThemeIcons(true);
    } else {
        updateThemeIcons(false);
    }
}

function updateThemeIcons(isDark) {
    if (isDark) {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'inline-block';
    } else {
        lightIcon.style.display = 'inline-block';
        darkIcon.style.display = 'none';
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
}

// Render Projects
function renderProjects(projectsData) {
    if (!dataContainer) return;

    dataContainer.innerHTML = projectsData.map(project => `
        <article class="card" aria-labelledby="project-title-${project.id}">
            <div class="card-image-wrapper">
                <img src="${project.image}" alt="${project.altText}" loading="lazy">
            </div>
            <div class="card-content">
                <span class="card-category">${project.category}</span>
                <h2 id="project-title-${project.id}" class="card-title">${project.title}</h2>
                <p class="card-description">${project.description}</p>
                <div class="card-actions">
                    <a href="#" class="btn btn-primary" aria-label="Learn more about ${project.title}">Learn More</a>
                </div>
            </div>
        </article>
    `).join('');
}

// Intersection Observer for Scroll Animation
function setupIntersectionObserver() {
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
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    themeToggleBtn?.addEventListener('click', toggleTheme);

    renderProjects(projects);

    // Setup observer after a slight delay to ensure DOM is fully painted
    setTimeout(setupIntersectionObserver, 100);
});
