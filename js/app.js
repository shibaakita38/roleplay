// app.js - Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    handleHashChange();
});

window.addEventListener('hashchange', handleHashChange);

// Mock Portfolio Data
const portfolioProjects = [
    {
        id: 1,
        title: "E-Commerce Replatforming",
        category: "Web Development",
        text: "A complete overhaul of an e-commerce platform using modern SPA architecture, improving load times by 40%.",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "FinTech Dashboard",
        category: "UI/UX Design",
        text: "Designed and developed a responsive financial dashboard with real-time data visualization and high accessibility.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "Healthcare Scheduling App",
        category: "Mobile First",
        text: "Built a progressive web app (PWA) for a local clinic, enabling patients to easily book and manage appointments.",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "AI Chat Interface",
        category: "Frontend Engineering",
        text: "Integrated an LLM backend with a custom-built, highly interactive chat interface featuring Markdown support.",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 5,
        title: "Travel Blog Platform",
        category: "Content Management",
        text: "Developed a custom headless CMS frontend tailored for high-performance content delivery and SEO optimization.",
        imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 6,
        title: "Smart Home Controller",
        category: "IoT Integration",
        text: "Created a web-based control panel for smart home devices, focusing on low latency and real-time state updates.",
        imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800"
    }
];

// Router Logic
let animationFrameId;

function handleHashChange() {
    const hash = window.location.hash;
    const mainContainer = document.querySelector('main');

    // Stop any running animations to prevent memory leaks
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    if (hash === '#in-god-we-trust') {
        mainContainer.innerHTML = inGodWeTrustView();
        startBouncingAnimation();
    } else {
        // Default to home for #home, empty hash, or unknown routes
        mainContainer.innerHTML = homeView();
        renderProjects();
        setupIntersectionObserver();
    }
}

function homeView() {
    return `
        <section id="hero" class="hero-section" aria-labelledby="hero-title">
            <h1 id="hero-title">Welcome to My Portfolio</h1>
            <p class="subtitle">Showcasing high-quality, accessible web experiences.</p>
            <button class="cta-button" onclick="document.getElementById('data-container').scrollIntoView({behavior: 'smooth'})">View My Work</button>
        </section>

        <section id="data-container" aria-label="Portfolio Projects">
            <!-- Dynamic content will be injected here -->
        </section>
    `;
}

function inGodWeTrustView() {
    return `
        <div style="width: 100vw; height: 100vh; overflow: hidden; position: relative; background: black;">
            <img id="bouncing-meme" src="https://i.ytimg.com/vi/XcA1E2p40I0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDEyYlS-8SrK_iCP_WsHbTWlo4DwQ" alt="In God We Trust" style="position: absolute; width: 300px; border-radius: 15px;">
        </div>
    `;
}

// Bouncing Animation Logic
function startBouncingAnimation() {
    const meme = document.getElementById('bouncing-meme');
    if (!meme) return;

    let x = 0;
    let y = 0;
    let vx = 4;
    let vy = 4;

    function animate() {
        if (!meme) return;

        const rect = meme.getBoundingClientRect();

        // Bounce off right or left
        if (x + rect.width >= window.innerWidth || x <= 0) {
            vx = -vx;
        }

        // Bounce off bottom or top
        if (y + rect.height >= window.innerHeight || y <= 0) {
            vy = -vy;
        }

        x += vx;
        y += vy;

        meme.style.left = `${x}px`;
        meme.style.top = `${y}px`;

        animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);
}

// Theme Toggle Logic
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggleBtn.setAttribute('aria-pressed', 'true');
        themeToggleBtn.querySelector('.theme-icon').textContent = '☀️';
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        const theme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', theme);

        themeToggleBtn.setAttribute('aria-pressed', isDark);
        themeToggleBtn.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌓';
    });
}

// Render Projects
function renderProjects() {
    const container = document.getElementById('data-container');

    if (!container) return;

    // Use DocumentFragment for performance
    const fragment = document.createDocumentFragment();

    portfolioProjects.forEach(project => {
        const article = document.createElement('article');
        article.className = 'card';
        article.setAttribute('aria-labelledby', `project-title-${project.id}`);

        article.innerHTML = `
            <img src="${project.imageUrl}" alt="Screenshot of ${project.title} project" loading="lazy">
            <div class="card-content">
                <span class="card-category">${project.category}</span>
                <h2 id="project-title-${project.id}" class="card-title">${project.title}</h2>
                <p class="card-text">${project.text}</p>
            </div>
        `;

        fragment.appendChild(article);
    });

    container.appendChild(fragment);
}

// Intersection Observer for Scroll Animations
function setupIntersectionObserver() {
    const cards = document.querySelectorAll('.card');

    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once faded in
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}