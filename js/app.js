/**
 * Mock data for portfolio projects
 */
const projects = [
    {
        id: 1,
        title: 'E-commerce Redesign',
        category: 'UX/UI Design',
        description: 'A complete overhaul of a legacy e-commerce platform focusing on mobile-first design and accessibility.',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800&h=500',
        link: '#'
    },
    {
        id: 2,
        title: 'Financial Dashboard',
        category: 'Web Application',
        description: 'A complex data visualization dashboard using modern JavaScript frameworks and charting libraries.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=500',
        link: '#'
    },
    {
        id: 3,
        title: 'Social Media App',
        category: 'Mobile Development',
        description: 'A cross-platform mobile application built with React Native with real-time features.',
        imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800&h=500',
        link: '#'
    },
    {
        id: 4,
        title: 'Corporate Branding',
        category: 'Graphic Design',
        description: 'Brand identity system including logo design, typography selection, and brand guidelines.',
        imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800&h=500',
        link: '#'
    },
    {
        id: 5,
        title: 'Healthcare Portal',
        category: 'Full Stack',
        description: 'A secure patient portal allowing users to schedule appointments and view medical records safely.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800&h=500',
        link: '#'
    },
    {
        id: 6,
        title: 'AI Content Generator',
        category: 'Machine Learning',
        description: 'An AI-powered tool that helps marketers generate blog posts, social media captions, and ad copy.',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=500',
        link: '#'
    }
];

/**
 * Initializes the application
 */
function init() {
    setupThemeToggle();
    renderProjects();
    setupIntersectionObserver();
}

/**
 * Handles Dark/Light theme toggling and persistence
 */
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('.theme-icon');

    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌗';
    }

    // Toggle listener
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

/**
 * Renders project cards into the data container
 */
function renderProjects() {
    const container = document.getElementById('data-container');

    // Clear container
    container.innerHTML = '';

    // Generate and append cards
    const fragment = document.createDocumentFragment();

    projects.forEach(project => {
        const card = document.createElement('article');
        card.className = 'card fade-in';
        card.setAttribute('aria-labelledby', `project-title-${project.id}`);

        card.innerHTML = `
            <div class="card-image-container">
                <img src="${project.imageUrl}" alt="Preview of ${project.title} project" class="card-image" loading="lazy" width="800" height="500">
            </div>
            <div class="card-content">
                <span class="card-category">${project.category}</span>
                <h2 id="project-title-${project.id}" class="card-title">${project.title}</h2>
                <p class="card-text">${project.description}</p>
                <a href="${project.link}" class="card-link" aria-label="Read more about ${project.title}">Read More</a>
            </div>
        `;

        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/**
 * Sets up Intersection Observer for scroll animations
 */
function setupIntersectionObserver() {
    // Options for the observer (which parts of the screen trigger the callback)
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS animation
                entry.target.classList.add('visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Target elements to observe
    const elementsToObserve = document.querySelectorAll('.fade-in');
    elementsToObserve.forEach(el => observer.observe(el));
}

// Run init when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
