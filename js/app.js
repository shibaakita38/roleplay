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
 * Views
 */
const homeView = () => `
    <section id="hero" class="hero" aria-labelledby="hero-title">
        <div class="hero-content">
            <h1 id="hero-title">Welcome to My Portfolio</h1>
            <p class="subtitle">Building high-quality, fully responsive, and accessible web experiences.</p>
            <button class="cta-button" aria-label="View my projects">View My Work</button>
        </div>
    </section>

    <section id="data-container" class="data-container" aria-labelledby="projects-title">
        <div class="section-header">
            <h2 id="projects-title">My Projects</h2>
        </div>
        <div class="grid-container" id="projects-grid" role="list">
            <!-- Dynamic content will be injected here via JavaScript -->
        </div>
    </section>
`;

const aboutView = () => `
    <section class="page-section" aria-labelledby="about-title">
        <div class="container">
            <h1 id="about-title">About Me</h1>
            <div class="about-content">
                <p>Hello! I am a passionate frontend developer dedicated to crafting modern, accessible, and highly responsive web applications. With a strong focus on clean code and user experience, I leverage vanilla JavaScript and modern CSS techniques to build seamless Single Page Applications.</p>
                <h2>My Skills</h2>
                <ul class="skills-list" role="list">
                    <li>HTML5 Semantic Markup</li>
                    <li>CSS3 (Grid, Flexbox, Custom Properties)</li>
                    <li>Vanilla JavaScript (ES6+)</li>
                    <li>Accessibility (a11y)</li>
                    <li>Responsive Web Design</li>
                    <li>Web Performance Optimization</li>
                </ul>
            </div>
        </div>
    </section>
`;

const contactView = () => `
    <section class="page-section" aria-labelledby="contact-title">
        <div class="container">
            <h1 id="contact-title">Contact Me</h1>
            <div class="contact-form-container">
                <form id="contact-form" class="contact-form" novalidate>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required aria-required="true" placeholder="Your Name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required aria-required="true" placeholder="your.email@example.com">
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="5" required aria-required="true" placeholder="Your message..."></textarea>
                    </div>
                    <button type="submit" class="cta-button">Send Message</button>
                </form>
            </div>
        </div>
    </section>
`;

/**
 * DOM Elements Selection
 */
const mainContent = document.getElementById('main-content');
const themeToggleBtn = document.getElementById('theme-toggle');
const currentYearSpan = document.getElementById('current-year');

/**
 * Render Projects
 * Injects project data as HTML cards into the DOM
 */
const renderProjects = () => {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';

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

        grid.appendChild(card);
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
 * Router
 * Handles hash-based navigation to render appropriate views
 */
const router = () => {
    let hash = window.location.hash || '#home';

    // Normalize hash for unknown routes
    if (!['#home', '#about', '#contact'].includes(hash)) {
        hash = '#home';
        window.history.replaceState(null, '', hash);
    }

    switch (hash) {
        case '#home':
            mainContent.innerHTML = homeView();
            // Re-render projects and re-attach observer for the home view
            renderProjects();
            requestAnimationFrame(() => {
                setupIntersectionObserver();
            });
            break;
        case '#about':
            mainContent.innerHTML = aboutView();
            break;
        case '#contact':
            mainContent.innerHTML = contactView();
            break;
        default:
            mainContent.innerHTML = homeView();
            break;
    }

    // Scroll to top on route change
    window.scrollTo(0, 0);
};

/**
 * Initialize Application
 */
const init = () => {
    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    setupThemeToggle();
    router(); // Initial route check
};

// Event Listeners for initialization and routing
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('hashchange', router);
