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

// Enhanced particle class with sophisticated effects
class EnhancedParticle {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = canvasHeight + 20;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = -(Math.random() * 3 + 1.5);
        this.life = 1;
        this.maxLife = 1;
        this.size = Math.random() * 4 + 2;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        
        // Enhanced color system
        const colorTypes = ['co2', 'capture', 'organic', 'energy'];
        this.type = colorTypes[Math.floor(Math.random() * colorTypes.length)];
        
        switch(this.type) {
            case 'co2':
                this.color = `hsl(${Math.random() * 60 + 340}, 80%, 60%)`; // Red-orange
                break;
            case 'capture':
                this.color = `hsl(${Math.random() * 60 + 160}, 70%, 55%)`; // Green-cyan
                break;
            case 'organic':
                this.color = `hsl(${Math.random() * 40 + 40}, 60%, 50%)`; // Yellow-green
                break;
            case 'energy':
                this.color = `hsl(${Math.random() * 60 + 200}, 75%, 65%)`; // Blue-cyan
                break;
        }
        
        // Physics properties
        this.gravity = 0.05;
        this.wind = (Math.random() - 0.5) * 0.02;
        this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
        // Enhanced physics
        this.speedY += this.gravity;
        this.speedX += this.wind;
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Rotation and pulsing
        this.rotation += this.rotationSpeed;
        this.pulse += 0.1;
        
        // Life decay with elegant fade
        this.life -= 0.008;
        
        // Boundary conditions
        return this.life > 0 && this.y > -100;
    }

    draw(ctx) {
        if (!ctx) return;
        
        ctx.save();
        ctx.globalAlpha = this.life * 0.8;
        
        // Move to particle position
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Pulsing size effect
        const pulseSize = this.size + Math.sin(this.pulse) * 0.5;
        
        // Draw outer glow
        ctx.globalAlpha = this.life * 0.3;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, pulseSize * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw main particle
        ctx.globalAlpha = this.life * 0.9;
        ctx.beginPath();
        ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw bright center
        ctx.globalAlpha = this.life;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, pulseSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Setup video background for hero
function setupHeroVideo() {
    const animationWrapper = document.querySelector('.animation-wrapper');
    if (!animationWrapper) return;

    // Create video element
    const video = document.createElement('video');
    video.id = 'hero-background-video';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 1;
        opacity: 0.7;
    `;

    // Add video sources
    const webmSource = document.createElement('source');
    webmSource.src = '/assets/videos/GE-CO2 Volumetric.webm';
    webmSource.type = 'video/webm';

    const mp4Source = document.createElement('source');
    mp4Source.src = '/assets/videos/GE-CO2 Volumetric.mp4';
    mp4Source.type = 'video/mp4';

    video.appendChild(webmSource);
    video.appendChild(mp4Source);

    // Insert video before canvas
    const canvas = document.getElementById('co2-animation-canvas');
    if (canvas) {
        canvas.style.zIndex = '2';
        canvas.style.position = 'relative';
        animationWrapper.insertBefore(video, canvas);
    }

    console.log('Hero video background setup complete');
}

// Enhanced hero animation with sophisticated particles
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

    // Set canvas size with higher resolution
    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        const ratio = window.devicePixelRatio || 1;
        
        canvas.width = rect.width * ratio;
        canvas.height = rect.height * ratio;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        
        ctx.scale(ratio, ratio);
    }
    
    resizeCanvas();
    setupHeroVideo();
    heroAnimationActive = true;
    particles = [];

    function animate() {
        if (!heroAnimationActive) return;

        try {
            const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
            const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
            
            // Clear canvas with slight fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // Add new particles with varied spawn patterns
            if (particles.length < maxParticles) {
                const spawnRate = Math.random();
                if (spawnRate < 0.4) {
                    particles.push(new EnhancedParticle(canvasWidth, canvasHeight));
                }
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
    console.log('Enhanced hero animation started successfully');
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

// Setup particle ring animation for Net Zero section
function setupParticleRing() {
    const ringContainer = document.getElementById('particle-ring-v1');
    if (!ringContainer) return;

    const numParticles = 16;
    const radius = 120;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'co2-particle-v1';
        particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #ff6b6b, #ff4757);
            border-radius: 50%;
            animation-delay: ${i * 0.2}s;
        `;
        
        const angle = (i / numParticles) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        particle.style.left = `calc(50% + ${x}px)`;
        particle.style.top = `calc(50% + ${y}px)`;
        
        ringContainer.appendChild(particle);
    }
    
    console.log('Particle ring animation setup complete');
}

// Setup path drawing animation for Net Negative section
function setupPathDrawing() {
    const svg = document.getElementById('drawing-svg-v2');
    if (!svg) return;

    const paths = svg.querySelectorAll('path');
    paths.forEach((path, index) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.animation = `drawPath 3s ease-in-out ${index * 0.5}s forwards`;
    });

    // Setup particle container animation
    const particleContainer = document.getElementById('co2-particle-container-v2');
    if (particleContainer) {
        setupFlowingParticles(particleContainer);
    }
    
    console.log('Path drawing animation setup complete');
}

// Setup flowing particles for Net Negative section
function setupFlowingParticles(container) {
    const particles = [];
    const maxFlowParticles = isMobile ? 15 : 25;
    
    function createFlowParticle() {
        const particle = document.createElement('div');
        particle.className = 'flow-particle';
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, #4ecdc4, #26d0ce);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
        `;
        
        // Start from tree position (left side)
        particle.style.left = '10%';
        particle.style.top = '60%';
        
        container.appendChild(particle);
        
        // Animate to CPU (center)
        setTimeout(() => {
            particle.style.transition = 'all 2s ease-in-out';
            particle.style.left = '50%';
            particle.style.top = '40%';
        }, 100);
        
        // Animate to house (right side)
        setTimeout(() => {
            particle.style.left = '90%';
            particle.style.top = '60%';
        }, 2100);
        
        // Remove particle
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4200);
    }
    
    // Create flowing particles at intervals
    const flowInterval = setInterval(() => {
        if (particles.length < maxFlowParticles) {
            createFlowParticle();
        }
    }, 800);
    
    return flowInterval;
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

// Core Animation for regenerative core section
function setupCoreAnimation() {
    const canvas = document.getElementById('coreAnimationCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    function resizeCoreCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        const ratio = window.devicePixelRatio || 1;
        
        canvas.width = rect.width * ratio;
        canvas.height = rect.height * ratio;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        
        ctx.scale(ratio, ratio);
    }
    
    resizeCoreCanvas();

    // Animation variables
    let coreAnimationActive = true;
    let time = 0;

    function animateCore() {
        if (!coreAnimationActive) return;

        try {
            const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
            const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
            
            // Clear canvas
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Animation calculations
            time += 0.02;
            const centerX = canvasWidth / 2;
            const centerY = canvasHeight / 2;

            // Draw flowing particles between input/process/output
            const inputX = canvasWidth * 0.15;
            const processX = canvasWidth * 0.5;
            const outputX = canvasWidth * 0.85;
            const y = centerY;

            // Input section (green particles)
            ctx.fillStyle = '#22c55e';
            ctx.globalAlpha = 0.7 + 0.3 * Math.sin(time);
            ctx.beginPath();
            ctx.arc(inputX, y, 8, 0, Math.PI * 2);
            ctx.fill();

            // Process section (blue particles)
            ctx.fillStyle = '#3b82f6';
            ctx.globalAlpha = 0.7 + 0.3 * Math.sin(time + Math.PI / 3);
            ctx.beginPath();
            ctx.arc(processX, y, 12, 0, Math.PI * 2);
            ctx.fill();

            // Output section (gold particles)
            ctx.fillStyle = '#fbbf24';
            ctx.globalAlpha = 0.7 + 0.3 * Math.sin(time + 2 * Math.PI / 3);
            ctx.beginPath();
            ctx.arc(outputX, y, 10, 0, Math.PI * 2);
            ctx.fill();

            // Draw connecting flows
            ctx.globalAlpha = 0.6;
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(inputX + 15, y);
            ctx.lineTo(processX - 15, y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(processX + 15, y);
            ctx.lineTo(outputX - 15, y);
            ctx.stroke();

            ctx.globalAlpha = 1;
            
            requestAnimationFrame(animateCore);
        } catch (error) {
            console.error('Core animation error:', error);
            coreAnimationActive = false;
        }
    }

    animateCore();
    console.log('Core animation setup complete');
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Globe-Eco animations...');
    
    try {
        setupMobileMenu();
        setupScrollAnimations();
        setupNavigation();
        setupSDGGrid();
        setupParticleRing();
        setupPathDrawing();
        setupCoreAnimation();
        
        // Start hero animation
        setTimeout(() => {
            startHeroAnimation();
        }, 100);
        
        console.log('All animations initialized');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
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