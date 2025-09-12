// Globe-Eco Mobile-Optimized Animations - Clean Version
console.log('Loading Globe-Eco animations...');

// Mobile detection and settings
const isMobile = window.innerWidth < 768;
const maxParticles = isMobile ? 120 : 300;
console.log(`Device: ${isMobile ? 'Mobile' : 'Desktop'}, Max particles: ${maxParticles}`);

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
    { id: 17, name: 'Partnerships for the Goals', color: '#19486A', description: 'Forms public-private partnerships to mobilize investment for the SDGs.' }
];

// Animation variables
let heroAnimationActive = false;
let animationFrameId = null;
let heroCanvas = null;
let heroCtx = null;
let canvasWidth = 0;
let canvasHeight = 0;

// Particle class
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
        this.speedY += 0.1; // Gravity
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

// Setup hero animation
function setupHeroAnimation() {
    console.log('Setting up hero animation...');
    heroCanvas = document.getElementById('co2-animation-canvas');
    if (!heroCanvas) {
        console.error('Hero canvas with id "co2-animation-canvas" not found');
        return false;
    }

    heroCtx = heroCanvas.getContext('2d');
    if (!heroCtx) {
        console.error('Could not get 2D context');
        return false;
    }

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

// Start hero animation
function startHeroAnimation() {
    if (heroAnimationActive) {
        console.log('Hero animation already active');
        return;
    }
    
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

        // Add new particles
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

// Setup SDG Grid
function setupSDGGrid() {
    console.log('Setting up SDG grid...');
    const gridContainer = document.getElementById('sdg-grid');
    if (!gridContainer) {
        console.error('SDG grid container with id "sdg-grid" not found');
        return;
    }

    console.log('Starting SDG grid loading with', sdgData.length, 'items');
    gridContainer.innerHTML = '';

    sdgData.forEach((goal, index) => {
        const goalElement = document.createElement('div');
        goalElement.className = 'sdg-item relative group cursor-pointer opacity-0 transform translate-y-4';
        goalElement.style.backgroundColor = goal.color;
        goalElement.style.animationDelay = `${index * 0.1}s`;

        const imagePath = `/assets/images/E-WEB-Goal-${goal.id.toString().padStart(2, '0')}.png`;

        goalElement.innerHTML = `
            <div class="aspect-square flex flex-col items-center justify-center p-2 sm:p-4 text-white">
                <img src="${imagePath}" alt="SDG ${goal.id}" class="w-8 h-8 sm:w-12 sm:h-12 mb-1 sm:mb-2 object-contain">
                <h3 class="text-xs sm:text-sm font-bold text-center leading-tight">${goal.name}</h3>
            </div>
            <div class="absolute inset-0 bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 sm:p-4 flex items-center justify-center">
                <p class="text-white text-xs sm:text-sm text-center leading-relaxed">${goal.description}</p>
            </div>
        `;

        gridContainer.appendChild(goalElement);

        setTimeout(() => {
            goalElement.classList.remove('opacity-0', 'translate-y-4');
            goalElement.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-500');
        }, index * (isMobile ? 50 : 100));
    });
    
    console.log('SDG grid setup complete');
}

// Setup scroll animations
function setupScrollAnimations() {
    console.log('Setting up scroll animations...');
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

    const sections = document.querySelectorAll('main section[id]');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    console.log('Scroll animations setup complete');
}

// Setup mobile menu
function setupMobileMenu() {
    console.log('Setting up mobile menu...');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuButton || !mobileMenu) {
        console.log('Mobile menu elements not found');
        return;
    }

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        console.log('Mobile menu toggled');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            console.log('Mobile menu closed');
        });
    });

    console.log('Mobile menu setup complete');
}

// Setup navigation
function setupNavigation() {
    console.log('Setting up navigation...');
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

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNav, isMobile ? 100 : 50);
    });
    
    console.log('Navigation setup complete');
}

// Setup resize handler
function setupResizeHandler() {
    console.log('Setting up resize handler...');
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
    console.log('Resize handler setup complete');
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Globe-Eco mobile animations initializing...');
    
    try {
        setupMobileMenu();
        setupNavigation();
        setupScrollAnimations();
        setupResizeHandler();
        setupSDGGrid();
        
        // Start hero animation after a short delay
        setTimeout(() => {
            startHeroAnimation();
        }, 200);
        
        console.log('All Globe-Eco animations initialized successfully');
        
    } catch (error) {
        console.error('Critical error initializing animations:', error);
    }
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