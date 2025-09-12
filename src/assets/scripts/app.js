// Globe-Eco Simple Working Animations
console.log('Loading Globe-Eco animations...');

// Simple mobile detection
const isMobile = window.innerWidth < 768;
const maxParticles = isMobile ? 120 : 300;
console.log(`Device: ${isMobile ? 'Mobile' : 'Desktop'}, Max particles: ${maxParticles}`);

// Global animation state
let heroAnimationActive = false;
let animationId = null;
let particles = [];

// Simple particle class
class SimpleParticle {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = canvasHeight + 20;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = -(Math.random() * 2 + 1);
        this.life = 1;
        this.size = Math.random() * 3 + 1;
        this.color = Math.random() > 0.5 ? '#ff6b6b' : '#4ecdc4';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.01;
        return this.life > 0 && this.y > -50;
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

// Simple hero animation
function startHeroAnimation() {
    if (heroAnimationActive) return;
    
    const canvas = document.getElementById('co2-animation-canvas');
    if (!canvas) {
        console.error('Canvas not found');
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get canvas context');
        return;
    }

    // Set canvas size
    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
    }
    
    resizeCanvas();
    heroAnimationActive = true;
    particles = [];

    function animate() {
        if (!heroAnimationActive) return;

        try {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Add new particles
            if (particles.length < maxParticles && Math.random() < 0.3) {
                particles.push(new SimpleParticle(canvas.width, canvas.height));
            }

            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                if (!particle.update()) {
                    particles.splice(i, 1);
                } else {
                    particle.draw(ctx);
                }
            }

            animationId = requestAnimationFrame(animate);
        } catch (error) {
            console.error('Animation error:', error);
            heroAnimationActive = false;
        }
    }

    animate();
    console.log('Hero animation started successfully');
}

// Simple mobile menu
function setupMobileMenu() {
    const button = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    
    if (button && menu) {
        button.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
        
        // Close menu when clicking links
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
        
        console.log('Mobile menu setup complete');
    }
}

// Simple SDG grid setup
function setupSDGGrid() {
    const container = document.getElementById('sdg-grid');
    if (!container) return;

    const sdgData = [
        { id: 1, name: 'No Poverty', color: '#E5243B' },
        { id: 2, name: 'Zero Hunger', color: '#DDA63A' },
        { id: 3, name: 'Good Health and Well-being', color: '#4C9F38' },
        { id: 4, name: 'Quality Education', color: '#C5192D' },
        { id: 5, name: 'Gender Equality', color: '#FF3A21' },
        { id: 6, name: 'Clean Water and Sanitation', color: '#26BDE2' },
        { id: 7, name: 'Affordable and Clean Energy', color: '#FCC30B' },
        { id: 8, name: 'Decent Work and Economic Growth', color: '#A21942' },
        { id: 9, name: 'Industry, Innovation and Infrastructure', color: '#FD6925' },
        { id: 10, name: 'Reduced Inequality', color: '#DD1367' },
        { id: 11, name: 'Sustainable Cities and Communities', color: '#FD9D24' },
        { id: 12, name: 'Responsible Consumption and Production', color: '#BF8B2E' },
        { id: 13, name: 'Climate Action', color: '#3F7E44' },
        { id: 14, name: 'Life Below Water', color: '#0A97D9' },
        { id: 15, name: 'Life on Land', color: '#56C02B' },
        { id: 16, name: 'Peace, Justice and Strong Institutions', color: '#00689D' },
        { id: 17, name: 'Partnerships for the Goals', color: '#19486A' }
    ];

    container.innerHTML = '';

    sdgData.forEach((goal, index) => {
        const div = document.createElement('div');
        div.className = 'relative group cursor-pointer opacity-0 transform translate-y-4 transition-all duration-500';
        div.style.backgroundColor = goal.color;
        
        div.innerHTML = `
            <div class="aspect-square flex flex-col items-center justify-center p-2 sm:p-4 text-white">
                <img src="/assets/images/E-WEB-Goal-${goal.id.toString().padStart(2, '0')}.png" 
                     alt="SDG ${goal.id}" 
                     class="w-8 h-8 sm:w-12 sm:h-12 mb-1 sm:mb-2 object-contain">
                <h3 class="text-xs sm:text-sm font-bold text-center leading-tight">${goal.name}</h3>
            </div>
        `;

        container.appendChild(div);

        // Animate in
        setTimeout(() => {
            div.classList.remove('opacity-0', 'translate-y-4');
            div.classList.add('opacity-100', 'translate-y-0');
        }, index * 100);
    });

    console.log('SDG grid setup complete');
}

// Setup scroll animations and section visibility
function setupScrollAnimations() {
    const observerOptions = {
        threshold: isMobile ? 0.1 : 0.3,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.classList.add('visible');
                console.log('Section visible:', target.id);
            }
        });
    }, observerOptions);

    // Observe all sections with fade-in animation
    const fadeInSections = document.querySelectorAll('.section-fade-in');
    fadeInSections.forEach(section => {
        observer.observe(section);
    });

    console.log('Scroll animations setup complete');
}

// Simple navigation highlighting
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    if (!navLinks.length || !sections.length) return;

    function updateActiveNav() {
        const scrollPos = window.pageYOffset + 100;
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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

    window.addEventListener('scroll', updateActiveNav);
    console.log('Navigation setup complete');
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Globe-Eco animations...');
    
    setupMobileMenu();
    setupScrollAnimations();
    setupNavigation();
    setupSDGGrid();
    
    // Start hero animation
    setTimeout(() => {
        startHeroAnimation();
    }, 100);
    
    console.log('All animations initialized');
});

// Window resize handler
window.addEventListener('resize', () => {
    if (heroAnimationActive) {
        heroAnimationActive = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        setTimeout(startHeroAnimation, 100);
    }
});

console.log('Globe-Eco animations loaded');