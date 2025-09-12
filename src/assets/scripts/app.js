// Mobile-optimized Globe-Eco animations with immediate startup
console.log('Loading Globe-Eco animations...');

// Asset imports for animations
import palmFrondUrl from '/assets/images/GE-PalmFrond.png';
import coconutTreeUrl from '/assets/images/CoconutTree.png';
import sdgWheelUrl from '/assets/images/GE-SDG-Wheel.png';
import cpuUrl from '/assets/images/GE-CPU.png';
import recycleImageUrl from '/assets/images/Recycle.png';

// SDG goal imports
import goal01 from '/assets/images/E-WEB-Goal-01.png';
import goal02 from '/assets/images/E-WEB-Goal-02.png';
import goal03 from '/assets/images/E-WEB-Goal-03.png';
import goal04 from '/assets/images/E-WEB-Goal-04.png';
import goal05 from '/assets/images/E-WEB-Goal-05.png';
import goal06 from '/assets/images/E-WEB-Goal-06.png';
import goal07 from '/assets/images/E-WEB-Goal-07.png';
import goal08 from '/assets/images/E-WEB-Goal-08.png';
import goal09 from '/assets/images/E-WEB-Goal-09.png';
import goal10 from '/assets/images/E-WEB-Goal-10.png';
import goal11 from '/assets/images/E-WEB-Goal-11.png';
import goal12 from '/assets/images/E-WEB-Goal-12.png';
import goal13 from '/assets/images/E-WEB-Goal-13.png';
import goal14 from '/assets/images/E-WEB-Goal-14.png';
import goal15 from '/assets/images/E-WEB-Goal-15.png';
import goal16 from '/assets/images/E-WEB-Goal-16.png';
import goal17 from '/assets/images/E-WEB-Goal-17.png';

const sdgImageModules = {
    '/assets/images/E-WEB-Goal-01.png': { default: goal01 },
    '/assets/images/E-WEB-Goal-02.png': { default: goal02 },
    '/assets/images/E-WEB-Goal-03.png': { default: goal03 },
    '/assets/images/E-WEB-Goal-04.png': { default: goal04 },
    '/assets/images/E-WEB-Goal-05.png': { default: goal05 },
    '/assets/images/E-WEB-Goal-06.png': { default: goal06 },
    '/assets/images/E-WEB-Goal-07.png': { default: goal07 },
    '/assets/images/E-WEB-Goal-08.png': { default: goal08 },
    '/assets/images/E-WEB-Goal-09.png': { default: goal09 },
    '/assets/images/E-WEB-Goal-10.png': { default: goal10 },
    '/assets/images/E-WEB-Goal-11.png': { default: goal11 },
    '/assets/images/E-WEB-Goal-12.png': { default: goal12 },
    '/assets/images/E-WEB-Goal-13.png': { default: goal13 },
    '/assets/images/E-WEB-Goal-14.png': { default: goal14 },
    '/assets/images/E-WEB-Goal-15.png': { default: goal15 },
    '/assets/images/E-WEB-Goal-16.png': { default: goal16 },
    '/assets/images/E-WEB-Goal-17.png': { default: goal17 }
};

// SDG data
const sdgData = [
    { id: 1, name: 'No Poverty', color: '#E5243B', description: 'Provides a +250% income increase to farmers, lifting families from <$2/day.' },
    { id: 2, name: 'Zero Hunger', color: '#DDA63A', description: 'Promotes sustainable agriculture and improves food security through intercropping.' },
    { id: 3, name: 'Good Health and Well-being', color: '#4C9F38', description: 'Reduces air pollution by eliminating biomass burning, improving respiratory health.' },
    { id: 4, name: 'Quality Education', color: '#C5192D', description: 'Provides materials for building schools and increased family income supports education.' },
    { id: 5, name: 'Gender Equality', color: '#FF3A21', description: 'Empowers women in rural communities with new economic opportunities.' },
    { id: 6, name: 'Clean Water and Sanitation', color: '#26BDE2', description: 'Protects watersheds by reducing deforestation and land degradation.' },
    { id: 7, name: 'Affordable and Clean Energy', color: '#FCC30B', description: 'CPUs are self-powered by biomass gasification, providing off-grid energy.' },
    { id: 8, name: 'Decent Work and Economic Growth', color: '#A21942', description: 'Creates thousands of high-tech jobs and stimulates local economies.' },
    { id: 9, name: 'Industry, Innovation and Infrastructure', color: '#FD6925', description: 'Builds resilient, sustainable infrastructure with carbon-negative materials.' },
    { id: 10, name: 'Reduced Inequality', color: '#DD1367', description: 'Reduces inequality by providing wealth creation opportunities in rural areas.' },
    { id: 11, name: 'Sustainable Cities and Communities', color: '#FD9D24', description: 'Supplies sustainable, affordable building materials for housing and public works.' },
    { id: 12, name: 'Responsible Consumption and Production', color: '#BF8B2E', description: 'Creates a circular economy model by upcycling agricultural waste.' },
    { id: 13, name: 'Climate Action', color: '#3F7E44', description: 'Delivers gigaton-scale, permanent carbon dioxide removal.' },
    { id: 14, name: 'Life Below Water', color: '#0A97D9', description: 'Stay tuned: Diverts thousands of tons of plastic waste, preventing it from reaching oceans.' },
    { id: 15, name: 'Life on Land', color: '#56C02B', description: 'Reduces demand for logging, protecting forests and biodiversity.' },
    { id: 16, name: 'Peace, Justice and Strong Institutions', color: '#00689D', description: 'Promotes fair trade practices and economic stability in developing regions.' },
    { id: 17, name: 'Partnerships for the Goals', color: '#19486A', description: 'Forms public-private partnerships to mobilize investment for the SDGs.' },
];

// Mobile detection and animation settings
const isMobile = window.innerWidth < 768;
const maxParticles = isMobile ? 120 : 300;
console.log(`Device: ${isMobile ? 'Mobile' : 'Desktop'}, Max particles: ${maxParticles}`);

// Global animation variables
let heroAnimationActive = false;
let animationFrameId = null;
let heroCanvas = null;
let heroCtx = null;
let canvasWidth = 0;
let canvasHeight = 0;

// Hero animation setup with immediate start
function setupHeroAnimation() {
    heroCanvas = document.getElementById('co2-animation-canvas');
    if (!heroCanvas) {
        console.error('Hero canvas not found');
        return false;
    }

    heroCtx = heroCanvas.getContext('2d');
    if (!heroCtx) {
        console.error('Could not get 2D context');
        return false;
    }

    // Mobile-optimized canvas setup with proper DPI handling
    const container = heroCanvas.parentElement;
    if (!container) {
        console.error('Hero canvas parent not found');
        return false;
    }
    
    const containerRect = container.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    
    // Store CSS dimensions for drawing logic
    canvasWidth = containerRect.width;
    canvasHeight = containerRect.height;
    
    // Set canvas buffer size (actual pixels)
    heroCanvas.width = canvasWidth * ratio;
    heroCanvas.height = canvasHeight * ratio;
    
    // Set canvas CSS size (display size)
    heroCanvas.style.width = canvasWidth + 'px';
    heroCanvas.style.height = canvasHeight + 'px';
    
    // Scale context for high DPI
    heroCtx.scale(ratio, ratio);
    
    console.log(`Hero canvas setup: CSS ${canvasWidth}x${canvasHeight}, buffer ${heroCanvas.width}x${heroCanvas.height}, ratio: ${ratio}`);
    return true;
}

// Particle system for hero animation
class Particle {
    constructor(x, y, type = 'co2') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = Math.random() * 0.01 + 0.005;
        this.color = type === 'co2' ? '#ff6b6b' : '#4ecdc4';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        
        // Gravity effect
        this.speedY += 0.1;
        
        return this.life > 0;
    }

    draw(ctx) {
        if (!ctx) return;
        
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Hero animation with mobile optimization
function startHeroAnimation() {
    if (heroAnimationActive) return;
    
    console.log('Starting hero animation...');
    if (!setupHeroAnimation()) {
        console.error('Failed to setup hero animation');
        return;
    }

    heroAnimationActive = true;
    const particles = [];
    let lastTime = 0;

    function animate(currentTime) {
        if (!heroAnimationActive || !heroCtx) return;

        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        // Clear canvas using CSS dimensions
        heroCtx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Add new particles (mobile-optimized frequency)
        if (particles.length < maxParticles && Math.random() < (isMobile ? 0.3 : 0.5)) {
            particles.push(new Particle(
                Math.random() * canvasWidth,
                canvasHeight + 10,
                Math.random() > 0.5 ? 'co2' : 'capture'
            ));
        }

        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            if (!particle.update()) {
                particles.splice(i, 1);
            } else {
                particle.draw(heroCtx);
            }
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);
    console.log('Hero animation started successfully');
}

function stopHeroAnimation() {
    heroAnimationActive = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    console.log('Hero animation stopped');
}

// SDG Grid Animation
function setupSDGGrid() {
    const gridContainer = document.getElementById('sdg-grid');
    if (!gridContainer) {
        console.error('SDG grid container not found');
        return;
    }

    console.log('Starting SDG grid loading with', sdgData.length, 'items');
    
    // Clear existing content
    gridContainer.innerHTML = '';

    sdgData.forEach((goal, index) => {
        const goalElement = document.createElement('div');
        goalElement.className = 'sdg-item relative group cursor-pointer opacity-0 transform translate-y-4';
        goalElement.style.backgroundColor = goal.color;
        goalElement.style.animationDelay = `${index * 0.1}s`;

        const imagePath = `/assets/images/E-WEB-Goal-${goal.id.toString().padStart(2, '0')}.png`;
        const imageModule = sdgImageModules[imagePath];
        const imageSrc = imageModule ? imageModule.default : imagePath;

        goalElement.innerHTML = `
            <div class="aspect-square flex flex-col items-center justify-center p-2 sm:p-4 text-white">
                <img src="${imageSrc}" alt="SDG ${goal.id}" class="w-8 h-8 sm:w-12 sm:h-12 mb-1 sm:mb-2 object-contain">
                <h3 class="text-xs sm:text-sm font-bold text-center leading-tight">${goal.name}</h3>
            </div>
            <div class="absolute inset-0 bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 sm:p-4 flex items-center justify-center">
                <p class="text-white text-xs sm:text-sm text-center leading-relaxed">${goal.description}</p>
            </div>
        `;

        gridContainer.appendChild(goalElement);

        // Animate in with mobile-optimized timing
        setTimeout(() => {
            goalElement.classList.remove('opacity-0', 'translate-y-4');
            goalElement.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-500');
        }, index * (isMobile ? 50 : 100));
    });
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: isMobile ? 0.1 : 0.3,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.classList.add('animate-fade-in-up');
                console.log('Observing section:', target.id);
            }
        });
    }, observerOptions);

    // Observe all main sections
    const sections = document.querySelectorAll('main section[id]');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuButton || !mobileMenu) {
        console.error('Mobile menu elements not found');
        return;
    }

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    console.log('Mobile menu setup complete');
}

// Navigation scroll highlighting
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    if (!navLinks.length || !sections.length) {
        console.log('Navigation elements not found');
        return;
    }

    function updateActiveNav() {
        let current = '';
        const scrollPos = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Throttled scroll handler for better mobile performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNav, isMobile ? 100 : 50);
    });
}

// Resize handler for responsive animations
function setupResizeHandler() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (heroAnimationActive) {
                console.log('Restarting hero animation due to resize');
                stopHeroAnimation();
                setTimeout(startHeroAnimation, 100);
            }
        }, 250);
    });
}

// Form handling with mobile optimization
function setupFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }

    function showError(form, message) {
        const existingError = form.querySelector('.error-message');
        if (existingError) existingError.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4';
        errorDiv.textContent = message;
        form.insertBefore(errorDiv, form.firstChild);
    }

    function clearError(form) {
        const existingError = form.querySelector('.error-message');
        if (existingError) existingError.remove();
    }

    function isValidEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearError(contactForm);
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
        }

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const token = formData.get('cf-turnstile-response');

        // Validation
        if (!name || !email || !message) {
            showError(contactForm, 'Please fill out all required fields.');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            }
            return;
        }

        if (!isValidEmailFormat(email)) {
            showError(contactForm, 'Please enter a valid email address.');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            }
            return;
        }

        // Success message for demo
        contactForm.innerHTML = `
            <div class="text-center">
                <h3 class="text-2xl font-bold text-green-400 mb-2">Thank You!</h3>
                <p class="text-white">Your message has been received. We'll get back to you soon!</p>
            </div>
        `;
    });

    console.log('Form handling setup complete');
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Globe-Eco mobile animations initializing...');
    
    try {
        // Setup core functionality
        setupMobileMenu();
        setupNavigation();
        setupScrollAnimations();
        setupFormHandling();
        setupResizeHandler();
        setupSDGGrid();
        
        // Start hero animation immediately on render
        setTimeout(() => {
            startHeroAnimation();
        }, 100);
        
        console.log('All Globe-Eco animations initialized successfully');
        
    } catch (error) {
        console.error('Critical error initializing animations:', error);
    }
    
    // Add global error handler to catch remaining exceptions
    window.addEventListener('error', (event) => {
        console.warn('Global error caught (may be from other scripts):', event.error);
    });
    
    window.addEventListener('unhandledrejection', (event) => {
        console.warn('Unhandled promise rejection caught:', event.reason);
    });
});

// Export for debugging
window.GlobeEcoAnimations = {
    startHeroAnimation,
    stopHeroAnimation,
    setupSDGGrid,
    isMobile,
    maxParticles
};

console.log('Globe-Eco animations loaded successfully');