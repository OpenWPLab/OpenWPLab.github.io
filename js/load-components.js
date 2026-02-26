/**
 * Component Loader - Responsible for dynamically loading modules
 */

// Load a single component
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const container = document.getElementById(elementId);
        if (container) {
            container.innerHTML = html;
        }
    } catch (error) {
        console.error(`Failed to load component ${filePath}:`, error);
    }
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Initialize smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Execute after page load is complete
document.addEventListener('DOMContentLoaded', async () => {
    // Load all components in sequence
    await loadComponent('nav-container', '/components/navigation.html');
    await loadComponent('home-container', 'components/home.html');
    await loadComponent('publications-container', 'components/recent_works.html');
    await loadComponent('people-container', 'components/people.html');
    // await loadComponent('sponsors-container', 'components/sponsors.html');
    await loadComponent('footer-container', '/components/footer.html');
    
    // Initialize interactive features after all components are loaded
    initMobileMenu();
    initSmoothScroll();
    
    // Remove loading state (if any)
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
});
