// CSS imports for proper bundling
import '../styles/tailwind.css';
import '../styles/main.css';

// Import critical images for proper Vite processing
import heroPicture from '../images/GE-plantation.jpg?preset=hero';
import logoUrl from '../images/GE-CropX.png';

// Hero preload is now handled statically in HTML for better performance

// Import SDG goal images with eager loading to prevent scroll delays
const sdgImages = import.meta.glob('../images/E-WEB-Goal-*.png', { eager: true, query: '?url', import: 'default' });

// Import other critical images that need JavaScript loading
import carbonCyclePicture from '../images/GE-CoconutCarbonCycle-optimized.webp?preset=content&as=picture';
import coconutTreeUrl from '../images/CoconutTree.png';
import palmFrondUrl from '../images/GE-PalmFrond.png';
import cpuPicture from '../images/GE-CPU-medium.webp?preset=content';
import cpuConstellationPicture from '../images/GE-CPU-Constellation-optimized.webp?preset=content';
// Fallback URLs for canvas/animation use - Use transparent CPU image
const cpuUrl = '/images/GE-CPU-small.webp';
const cpuConstellationUrl = cpuConstellationPicture?.img?.src || cpuConstellationPicture;
const carbonCycleUrl = carbonCyclePicture?.img?.src || carbonCyclePicture;
const cocoWoodUrl = cocoWoodPicture?.img?.src || cocoWoodPicture;
const eagleUrl = eaglePicture?.img?.src || eaglePicture;
const tarsierUrl = tarsierPicture?.img?.src || tarsierPicture;
import husksUrl from '../images/GE-Husks.png';
import cocoWoodPicture from '../images/GE-CocoWood.jpg?preset=content&as=picture';
import co2DataUrl from '../images/co2-data-1751-2024.png';
import eaglePicture from '../images/WP-Philippine_Eagle.jpg?preset=content&as=picture';
import tarsierPicture from '../images/WP-Tarsier-GG.jpg?preset=content&as=picture';
import cocoSmokeUrl from '../images/GE-Coco Smoke.png';
import prosperFutureUrl from '../images/GE-ProsperFuture.png';
import alchemistUrl from '../images/GE-MG-Alchemist.png';
import sageUrl from '../images/GE-RK-Sage2.png';
import adventureTicketUrl from '../images/GE-AdventureTicket.png';

// Dynamic Chart.js loader for performance
let Chart = null;
async function loadChart() {
    if (!Chart) {
        const chartModule = await import('chart.js/auto');
        Chart = chartModule.default;
        window.Chart = Chart; // For compatibility
    }
    return Chart;
}

// 1. Static imports for single assets - needed for  proper bundling
import sdgWheelUrl from '../images/GE-SDG-Wheel.png';
import recycleImageUrl from '../images/Recycle.png';
import dynamicImgUrl from '../images/GE-Logo-Tile.png';
import netZeroFireUrl from '../images/GE-NetZeroFire.webp';

// Google Analytics integration
import { initGA, trackPageView, trackEvent, trackScrollDepth, trackTimeOnPage } from './analytics.js';

// Chart.js will be loaded dynamically when charts are needed

// 2. SDG images are now served from public/images/ directory


// SDG data needed by the hero animation
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

// Add better error instrumentation
window.addEventListener('error', (event) => {
    console.error('Global error:', {
        message: event.message || 'Unknown error',
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        error: event.error
    });
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// Enhanced Video Lazy Loading with Intersection Observer
function initVideoLazyLoading() {
    const lazyVideos = document.querySelectorAll('[data-lazy-video]');
    
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(e => {
                        console.log('Video autoplay failed:', e);
                    });
                } else {
                    video.pause();
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.25
        });

        lazyVideos.forEach((video) => {
            videoObserver.observe(video);
        });
    } else {
        // Fallback for browsers without Intersection Observer - click to play
        lazyVideos.forEach((video) => {
            video.style.cursor = 'pointer';
            video.addEventListener('click', function() {
                if (video.paused) {
                    video.play().catch(e => {
                        console.log('Video play failed:', e);
                    });
                } else {
                    video.pause();
                }
            });
            // Add play button overlay for visual cue
            const playButton = document.createElement('div');
            playButton.innerHTML = '▶️';
            playButton.style.cssText = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:3rem;pointer-events:none;opacity:0.8;';
            video.parentNode.style.position = 'relative';
            video.parentNode.appendChild(playButton);
            video.addEventListener('play', () => playButton.style.display = 'none');
            video.addEventListener('pause', () => playButton.style.display = 'block');
        });
    }
}

// Setup SDG images with lazy loading for performance
function setupSdgImages() {
    const sdgGoalImages = document.querySelectorAll('.sdg-grid-item img, .sdg-goal-img');
    if (sdgGoalImages.length === 0) {
        console.warn('No SDG goal images found');
        return;
    }
    
    console.log('Setting up lazy loading for', Object.keys(sdgImages).length, 'SDG images');
    
    // Map goal numbers to their image URLs using eager imports
    const goalImageMap = {};
    Object.entries(sdgImages).forEach(([path, url]) => {
        const match = path.match(/E-WEB-Goal-(\d+)\.png$/);
        if (match) {
            const goalNumber = parseInt(match[1]);
            goalImageMap[goalNumber] = url;
        }
    });
    
    // Store image URLs in data attributes for lazy loading
    sdgGoalImages.forEach(img => {
        const goalNumber = parseInt(img.dataset.goalId || img.getAttribute('data-goal'));
        if (goalNumber && goalImageMap[goalNumber]) {
            img.dataset.src = goalImageMap[goalNumber]; // Store URL for lazy loading
            img.removeAttribute('src'); // Remove src to prevent immediate loading
            img.loading = 'lazy'; // Browser-native lazy loading as fallback
        }
    });
    
    // Set up IntersectionObserver for lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px' // Start loading 50px before the image is visible
        });
        
        sdgGoalImages.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    } else {
        // Fallback for older browsers: load images immediately
        sdgGoalImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
}

// Setup responsive CPU images with srcset
function setupCpuImages() {
    // Setup CPU Constellation image
    const cpuConstellationImg = document.querySelector('img[alt="Globe-Eco CPU Constellation"]');
    if (cpuConstellationImg && cpuConstellationPicture) {
        setupResponsiveImage(cpuConstellationImg, cpuConstellationPicture, 'CPU Constellation');
    }
    
    // Setup CPU images
    document.querySelectorAll('img[alt="Globe-Eco CPU"]').forEach(img => {
        if (cpuPicture) {
            setupResponsiveImage(img, cpuPicture, 'CPU');
        }
    });
}

// Setup responsive large content images with srcset
function setupLargeImages() {
    // Setup Carbon Cycle Diagram
    const carbonCycleImg = document.querySelector('img[alt="Globe-Eco Carbon Cycle Diagram"]');
    if (carbonCycleImg && carbonCyclePicture) {
        setupResponsiveImage(carbonCycleImg, carbonCyclePicture, 'Carbon Cycle Diagram');
    }
    
    // Setup CocoWood image
    const cocoWoodImg = document.querySelector('img[alt="Globe-Eco CocoWood"]');
    if (cocoWoodImg && cocoWoodPicture) {
        setupResponsiveImage(cocoWoodImg, cocoWoodPicture, 'CocoWood');
    }
    
    // Setup Philippine Eagle image
    const eagleImg = document.querySelector('img[alt*="Philippine"]');
    if (eagleImg && eaglePicture) {
        setupResponsiveImage(eagleImg, eaglePicture, 'Philippine Eagle');
    }
    
    // Setup Tarsier image
    const tarsierImg = document.querySelector('img[alt*="Tarsier"]');
    if (tarsierImg && tarsierPicture) {
        setupResponsiveImage(tarsierImg, tarsierPicture, 'Tarsier');
    }
}

// Generic helper to setup responsive images
function setupResponsiveImage(imgElement, pictureData, imageName) {
    if (!imgElement || !pictureData) return;
    
    // Create picture wrapper if not exists
    let pictureEl = imgElement.closest('picture');
    if (!pictureEl) {
        pictureEl = document.createElement('picture');
        imgElement.parentNode.insertBefore(pictureEl, imgElement);
        pictureEl.appendChild(imgElement);
    }
    
    // Clear existing sources
    pictureEl.querySelectorAll('source').forEach(source => source.remove());
    
    // Add responsive sources
    if (pictureData && typeof pictureData === 'object' && pictureData.sources) {
        const formatMimeTypes = {
            'avif': 'image/avif',
            'webp': 'image/webp', 
            'jpeg': 'image/jpeg'
        };
        
        Object.entries(pictureData.sources).forEach(([format, srcset]) => {
            const sourceEl = document.createElement('source');
            sourceEl.srcset = srcset;
            sourceEl.type = formatMimeTypes[format] || `image/${format}`;
            sourceEl.sizes = '(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 25vw';
            pictureEl.insertBefore(sourceEl, imgElement);
        });
    }
    
    // Set fallback image
    if (pictureData.img) {
        imgElement.src = pictureData.img.src;
        if (pictureData.img.srcset) {
            imgElement.srcset = pictureData.img.srcset;
        }
        imgElement.sizes = '(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 25vw';
    } else if (typeof pictureData === 'string') {
        imgElement.src = pictureData;
    }
    
    // Add lazy loading for non-critical images
    imgElement.loading = 'lazy';
    imgElement.decoding = 'async';
}

// Setup critical images with proper Vite-processed URLs
function setupCriticalImages() {
    // Set up responsive hero picture element
    // setupHeroPicture() - now static in HTML
    
    // Set main logo
    const logoImg = document.querySelector('img[alt="Globe-Eco Logo"]');
    if (logoImg) {
        logoImg.src = logoUrl;
    }
    
    // SDG images will be loaded after tiles are created in the impact section
    
    // Set up all other images
    setupOtherImages();
    
    // Set video poster images
    setupVideoPoster();
    
    // Set up responsive CPU images
    setupCpuImages();
    
    // Set up responsive large content images
    setupLargeImages();
    
    // Set up animation container backgrounds
    setupAnimationBackgrounds();
}

// Setup other critical images with proper Vite-processed URLs
function setupOtherImages() {
    // Map image IDs/selectors to their imported URLs
    // Note: CPU, Carbon Cycle, CocoWood, Eagle, and Tarsier images are now handled by responsive picture elements
    const imageMap = {
        '#tree-v2': coconutTreeUrl,
        '#frond-v2': palmFrondUrl,
        '#cpu-v2': cpuUrl,
        'img[alt="Coconut Husks"]': husksUrl,
        'img[alt="IPCC chart showing the increase in CO2 from 1751 to 2024"]': co2DataUrl,
        'img[alt="Black carbon smog from burning coconut waste"]': cocoSmokeUrl,
        'img[alt*="vision of a futuristic"]': prosperFutureUrl,
        'img[alt="Matthew Grecsek"]': alchemistUrl,
        'img[alt="Robert Knighton"]': sageUrl,
        'img[alt*="Adventure Ticket"]': adventureTicketUrl
    };
    
    // Apply the mapped URLs
    Object.entries(imageMap).forEach(([selector, url]) => {
        const img = document.querySelector(selector);
        if (img) {
            img.src = url;
        }
    });
    
    // CPU images are now handled by responsive picture elements
}

// Setup animation container backgrounds with proper Vite-processed URLs
function setupAnimationBackgrounds() {
    // Set NetZero Fire background for "The Problem" animation
    const animationContainer = document.getElementById('animation-container-v1');
    if (animationContainer) {
        animationContainer.style.backgroundImage = `url(${netZeroFireUrl})`;
    }
}

// Setup video poster images with proper Vite-processed URLs
function setupVideoPoster() {
    const bukoJoeVideo = document.getElementById('buko-joe-video');
    if (bukoJoeVideo) {
        bukoJoeVideo.poster = husksUrl;
    }
}

// Hero picture is now static in HTML for faster LCP - no JavaScript setup needed

document.addEventListener('DOMContentLoaded', () => {
    // Set up critical images with Vite-processed URLs  
    setupCriticalImages();
    
    // Hero picture is now static in HTML - no setup needed
    
    // Initialize video lazy loading
    initVideoLazyLoading();

            // --- CO2 Flow Animation (Hero) ---
            const heroCanvas = document.getElementById('co2-animation-canvas');
            
            // Only disable animation when user prefers reduced motion (mobile animation re-enabled)
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            // Debug: console.log('Animation check:', { screenWidth: window.innerWidth, prefersReducedMotion });
            
            if (heroCanvas && !prefersReducedMotion) {
                const ctx = heroCanvas.getContext('2d');
                let particles = [];
                const numParticles = 300;
                let animationFrameId;

                const cpuImage = new Image();
                cpuImage.src = cpuUrl;

                const sdgImage = new Image();
                sdgImage.src = sdgWheelUrl;

                const recycleImage = new Image();
                recycleImage.src = recycleImageUrl;

                const housePath = new Path2D("M4.39999 37.8L50.4 4.79999L96.4 37.8V83H4.39999V37.8Z");

                let allImagesLoaded = false;
                Promise.all([
                    new Promise(resolve => { cpuImage.onload = () => resolve(); }),
                    new Promise(resolve => { sdgImage.onload = () => resolve(); }),
                    new Promise(resolve => { recycleImage.onload = () => resolve(); })
                ]).then(() => {
                    allImagesLoaded = true;
                    console.log('Hero animation enabled');
                    if (!animationFrameId) {
                        resizeCanvas();
                        animate();
                    }
                });

                const cpuIcon = { x: 0, y: 0, width: 120, height: 120 };
                const sdgWheel = { x: 0, y: 0, radius: 0, rotation: 0 };

                const productCycle = {
                    x: 0, y: 0, size: 0,
                    state: 'DRAWING_HOUSE',
                    alpha: 0,
                    drawProgress: 0,
                    lastStateChange: 0
                };

                const socialBenefits = ["Reduce Poverty", "Clean Air & Oceans", "Good Incomes"];
                let benefitIndex = 0;
                let benefitAlpha = 0;
                let benefitState = 'FADING_IN'; // FADING_IN, SHOWING, FADING_OUT

                function resizeCanvas() {
                    const parent = heroCanvas.parentElement;
                    if (!parent) return;
                    // Batch layout reads to avoid forced reflows
                    const parentWidth = parent.offsetWidth;
                    const parentHeight = parent.offsetHeight;
                    if (parentWidth === 0 || parentHeight === 0) return; // Guard against zero dimensions
                    try {
                        heroCanvas.width = parentWidth;
                        heroCanvas.height = parentHeight;
                    } catch (error) {
                        console.error('Canvas resize error:', error);
                        return;
                    }

                    const verticalCenter = heroCanvas.height / 2 + 30;

                    cpuIcon.x = heroCanvas.width / 2 - cpuIcon.width / 2;
                    cpuIcon.y = verticalCenter;

                    sdgWheel.radius = Math.min(heroCanvas.width, heroCanvas.height) * 0.1;
                    sdgWheel.x = heroCanvas.width * 0.25;
                    sdgWheel.y = cpuIcon.y + cpuIcon.height/2;

                    productCycle.size = sdgWheel.radius * 2;
                    productCycle.x = heroCanvas.width * 0.75;
                    productCycle.y = sdgWheel.y - productCycle.size / 2;


                    initParticles();
                }

                class Particle {
                    constructor() { this.reset(); }
                    reset() {
                        const edge = Math.floor(Math.random() * 4);
                        if (edge === 0) { this.x = Math.random() * heroCanvas.width; this.y = -10; }
                        else if (edge === 1) { this.x = heroCanvas.width + 10; this.y = Math.random() * heroCanvas.height; }
                        else if (edge === 2) { this.x = Math.random() * heroCanvas.width; this.y = heroCanvas.height + 10; }
                        else { this.x = -10; this.y = Math.random() * heroCanvas.height; }

                        this.radius = Math.random() * 2 + 1;
                        this.opacity = Math.random() * 0.5 + 0.2;
                        this.speedX = 0;
                        this.speedY = 0;
                        this.vx = (Math.random() - 0.5) * 0.2;
                        this.vy = (Math.random() - 0.5) * 0.2;
                    }
                    draw() {
                        if (!Number.isFinite(this.x) || !Number.isFinite(this.y) || !Number.isFinite(this.radius)) return;
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                        ctx.fill();
                    }
                    update() {
                        const dx = (cpuIcon.x + cpuIcon.width / 2) - this.x;
                        const dy = cpuIcon.y + cpuIcon.height/2 - this.y;
                        const distance = Math.hypot(dx, dy) || 1; // Guard against divide-by-zero
                        this.speedX += (dx / distance) * 0.05;
                        this.speedY += (dy / distance) * 0.05;
                        this.x += this.speedX + this.vx;
                        this.y += this.speedY;
                        this.speedX *= 0.98;
                        this.speedY *= 0.98;
                        
                        // Reset particle if any values become non-finite
                        if (!Number.isFinite(this.x) || !Number.isFinite(this.y) || !Number.isFinite(this.speedX) || !Number.isFinite(this.speedY)) {
                            this.reset();
                            return;
                        }
                        
                        const distToCPU = Math.sqrt(Math.pow(this.x - (cpuIcon.x + cpuIcon.width/2), 2) + Math.pow(this.y - (cpuIcon.y + cpuIcon.height/2), 2));
                        if (distToCPU < cpuIcon.width/2) {
                            this.reset();
                        }
                    }
                }

                function initParticles() {
                    particles = [];
                    for (let i = 0; i < numParticles; i++) {
                        particles.push(new Particle());
                    }
                }

                const stateDurations = {
                    DRAWING_HOUSE: 3000, SHOWING_HOUSE: 2500, SHOWING_RECYCLE: 2500, FADING_OUT: 1000
                };

                function updateProductCycleState(now) {
                    if(!productCycle.lastStateChange) productCycle.lastStateChange = now;
                    const elapsed = now - productCycle.lastStateChange;

                    switch(productCycle.state) {
                        case 'DRAWING_HOUSE':
                            productCycle.alpha = 1;
                            productCycle.drawProgress = Math.min(1, elapsed / stateDurations.DRAWING_HOUSE);
                            if (elapsed >= stateDurations.DRAWING_HOUSE) {
                                productCycle.state = 'SHOWING_HOUSE';
                                productCycle.lastStateChange = now;
                            }
                            break;
                        case 'SHOWING_HOUSE':
                            if (elapsed >= stateDurations.SHOWING_HOUSE) {
                                productCycle.state = 'SHOWING_RECYCLE';
                                productCycle.lastStateChange = now;
                            }
                            break;
                        case 'SHOWING_RECYCLE':
                             if (elapsed >= stateDurations.SHOWING_RECYCLE) {
                                productCycle.state = 'FADING_OUT';
                                productCycle.lastStateChange = now;
                            }
                            break;
                        case 'FADING_OUT':
                            productCycle.alpha = 1 - (elapsed / stateDurations.FADING_OUT);
                            if (productCycle.alpha <= 0) {
                                productCycle.alpha = 0;
                                productCycle.state = 'DRAWING_HOUSE';
                                productCycle.lastStateChange = now;
                                productCycle.drawProgress = 0;
                            }
                            break;
                    }
                }

                function updateBenefitText() {
                       switch(benefitState) {
                            case 'FADING_IN':
                                benefitAlpha = Math.min(1, benefitAlpha + 0.02);
                                if(benefitAlpha >= 1) {
                                    benefitState = 'SHOWING';
                                    setTimeout(() => { benefitState = 'FADING_OUT'; }, 2000);
                                }
                                break;
                            case 'FADING_OUT':
                                benefitAlpha = Math.max(0, benefitAlpha - 0.02);
                                if(benefitAlpha <= 0) {
                                    benefitState = 'FADING_IN';
                                    benefitIndex = (benefitIndex + 1) % sdgData.length;
                                }
                                break;
                        }
                }

                function drawOutputs(now) {
                    if (!allImagesLoaded) return;

                    // --- Connecting Lines ---
                    const productCenterX = productCycle.x;
                    const productCenterY = productCycle.y + productCycle.size / 2;

                    ctx.beginPath();
                    ctx.moveTo(cpuIcon.x + cpuIcon.width / 2, cpuIcon.y + cpuIcon.height / 2);
                    ctx.lineTo(sdgWheel.x, sdgWheel.y);
                    ctx.moveTo(cpuIcon.x + cpuIcon.width / 2, cpuIcon.y + cpuIcon.height / 2);
                    ctx.lineTo(productCenterX, productCenterY);
                    ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
                    ctx.lineWidth = 3;
                    ctx.stroke();

                    // --- CPU ---
                    const pulse = (Math.sin(Date.now() / 650) + 1) / 2;
                    
                    // Draw pulsing halo effect - more prominent
                    const centerX = cpuIcon.x + cpuIcon.width / 2;
                    const centerY = cpuIcon.y + cpuIcon.height / 2;
                    const haloRadius = Math.max(cpuIcon.width, cpuIcon.height) * (0.8 + pulse * 0.6);
                    
                    const gradHalo = ctx.createRadialGradient(centerX, centerY, haloRadius * 0.2, centerX, centerY, haloRadius);
                    gradHalo.addColorStop(0, 'rgba(132, 169, 140, 0.9)');
                    gradHalo.addColorStop(0.5, 'rgba(132, 169, 140, 0.4)');
                    gradHalo.addColorStop(1, 'rgba(132, 169, 140, 0)');
                    ctx.fillStyle = gradHalo;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, haloRadius, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Draw CPU at normal size with no shadows or outlines
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;
                    ctx.drawImage(cpuImage, cpuIcon.x, cpuIcon.y, cpuIcon.width, cpuIcon.height);

                    // --- SDG Wheel and Text ---
                    if (sdgWheel.radius > 0) {
                        ctx.save();
                        ctx.translate(sdgWheel.x, sdgWheel.y);
                        ctx.rotate(sdgWheel.rotation);
                        ctx.drawImage(sdgImage, -sdgWheel.radius, -sdgWheel.radius, sdgWheel.radius * 2, sdgWheel.radius * 2);
                        ctx.restore();
                    }
                    sdgWheel.rotation -= 0.002;

                    updateBenefitText();
                    ctx.font = `bold ${Math.max(10, heroCanvas.width * 0.012)}px Inter, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.fillStyle = `rgba(255, 255, 255, ${benefitAlpha})`;
                    ctx.shadowColor = 'rgba(0,0,0,0.8)';
                    ctx.shadowBlur = 4;
                    ctx.fillText(sdgData[benefitIndex].name, sdgWheel.x, sdgWheel.y + sdgWheel.radius + 25);
                    ctx.shadowBlur = 0;


                    // --- Product Cycle ---
                    updateProductCycleState(now);
                    if (productCycle.size > 0 && Number.isFinite(productCycle.alpha) && productCycle.alpha > 0) {
                        ctx.save();
                        ctx.globalAlpha = productCycle.alpha;
                        ctx.translate(productCycle.x, productCycle.y);
                        ctx.scale(productCycle.size/100, productCycle.size/100);

                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 3;
                    ctx.setLineDash([400, 400]);
                    ctx.lineDashOffset = 400 - (productCycle.drawProgress * 400);
                    ctx.stroke(housePath);
                    ctx.setLineDash([]);

                    ctx.font = `bold ${Math.max(10, heroCanvas.width * 0.012)}px Inter, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.fillStyle = 'white';
                    ctx.shadowColor = 'rgba(0,0,0,0.8)';
                    ctx.shadowBlur = 4;

                    let textAlpha = 0;
                    if (productCycle.state === 'DRAWING_HOUSE' && productCycle.drawProgress > 0.5) {
                         textAlpha = (productCycle.drawProgress - 0.5) * 2;
                    } else if (productCycle.state === 'SHOWING_HOUSE' || productCycle.state === 'SHOWING_RECYCLE') {
                        textAlpha = 1;
                    }

                    ctx.globalAlpha = productCycle.alpha * textAlpha;
                    if (productCycle.state === 'SHOWING_RECYCLE') {
                         const recycleSize = 45;
                         ctx.drawImage(recycleImage, (100 - recycleSize) / 2, (83 - recycleSize) / 2 + 5, recycleSize, recycleSize);
                         ctx.fillText('Local Recyclability = Permanence', 50, 115);
                    } else {
                         ctx.fillText('CO2 locked for 100+ years', 50, 115);
                    }
                    ctx.restore();
                    }
                }

                function animate(now) {
                    animationFrameId = requestAnimationFrame(animate);
                    try {
                        // Guard against zero-sized canvas
                        if (!heroCanvas.width || !heroCanvas.height) {
                            return;
                        }
                        if (!productCycle.lastStateChange) productCycle.lastStateChange = now;
                        ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
                        particles.forEach(p => { p.update(); p.draw(); });
                        drawOutputs(now);
                    } catch (error) {
                        console.error('Hero animation error:', error);
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                }

                // Throttle resize events to prevent scroll-induced jitter
                let resizeTimeout;
                window.addEventListener('resize', () => {
                    if (resizeTimeout) clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(() => {
                        if(animationFrameId) cancelAnimationFrame(animationFrameId);
                        resizeCanvas();
                        animate();
                    }, 100); // Debounce resize by 100ms
                });
            } else {
                console.log('Hero animation disabled due to reduced motion preference');
            }

            // --- Slideshow ---
            let slideIndex = 0;
            showSlides();

            function showSlides() {
                let i;
                let slides = document.getElementsByClassName("slide");
                if (slides.length === 0) return;
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                slideIndex++;
                if (slideIndex > slides.length) {slideIndex = 1}
                slides[slideIndex-1].style.display = "block";
                setTimeout(showSlides, 4000); // Change image every 4 seconds
            }

            // --- Poverty Line Plugin for Chart.js ---
            const povertyLinePlugin = {
                id: 'povertyLine',
                afterDraw: (chart) => {
                    try {
                        // Guard against invalid chart state
                        if (!chart.chartArea || !chart.width || !chart.height || chart.width <= 0 || chart.height <= 0) {
                            return;
                        }
                        if (!chart.scales?.x || !chart.scales?.y || typeof chart.scales.x.getPixelForValue !== 'function') {
                            return;
                        }
                        
                        const lineValue = 1332; // Approx $3.65/day * 365
                        if (chart.config.type === 'bar' && chart.options.indexAxis === 'y') {
                            const ctx = chart.ctx;
                            const yAxis = chart.scales.y;
                            const xAxis = chart.scales.x;

                            // Draw the line
                            ctx.save();
                            ctx.beginPath();
                            ctx.moveTo(xAxis.getPixelForValue(lineValue), yAxis.top);
                            ctx.lineTo(xAxis.getPixelForValue(lineValue), yAxis.bottom);
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = '#ef4444';
                            ctx.setLineDash([6, 6]);
                            ctx.stroke();
                            ctx.restore();

                            // Draw the text
                            ctx.save();
                            ctx.fillStyle = '#ef4444';
                            ctx.textAlign = 'center';
                            ctx.font = '12px Inter, sans-serif';
                            ctx.fillText('Poverty Line', xAxis.getPixelForValue(lineValue), chart.chartArea.bottom + 35); 
                            ctx.restore();
                        }
                    } catch (error) {
                        console.error('Chart plugin error:', error);
                    }
                }
            };
            // Chart.js will be loaded when needed
            window.povertyLinePlugin = povertyLinePlugin;


            // --- Rest of the page's JS ---
            const chartData = {
                people: {
                    type: 'bar',
                    data: {
                        labels: ['Before Globe-Eco', 'After Globe-Eco'],
                        datasets: [{
                            label: 'Avg. Annual Farmer Income (USD)',
                            data: [500, 1750], 
                            backgroundColor: ['#FCA5A5', '#84A98C'],
                            borderColor: ['#EF4444', '#365314'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: 'y',
                        scales: {
                            x: {
                                beginAtZero: true,
                                ticks: { color: '#374151' },
                                max: 2000 
                            },
                            y: { ticks: { color: '#374151' } }
                        },
                        layout: {
                            padding: {
                                bottom: 40 
                            }
                        },
                        plugins: {
                            legend: { display: false },
                            title: { display: true, text: 'Farmer Income Increase', color: '#374151', font: { size: 16 } }
                        },
                        animation: {
                            duration: 1500,
                            easing: 'easeInOutQuart'
                        }
                    }
                },
                lca: {
                    type: 'bar',
                    data: {
                        labels: ['Net Removal'],
                        datasets: [{
                            label: 'kg CO₂eq per m³',
                            data: [-1643],
                            backgroundColor: ['#365314'],
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: (context) => `${context.parsed.x} kg CO₂eq (Net Removal)`
                                }
                            }
                        },
                        scales: { x: { ticks: { color: '#374151' } }, y: { ticks: { color: '#374151' } } }
                    }
                },
                growth: {
                    type: 'line',
                    data: {
                        labels: ['Y0', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5', 'Y6', 'Y7'],
                        datasets: [{
                            label: 'Total Units (Cumulative)',
                            data: [3, 15, 75, 300, 1200, 4000, 7000, 10000],
                            borderColor: '#365314',
                            backgroundColor: 'rgba(54, 83, 20, 0.1)',
                            fill: true,
                            yAxisID: 'y',
                            tension: 0.4
                        }, {
                            label: 'Annual CO2e Removed (Million Tons)',
                            data: [0.072, 0.36, 1.8, 7.2, 28.8, 440, 770, 1100],
                            borderColor: '#D4AF37',
                            backgroundColor: 'rgba(212, 175, 55, 0.1)',
                            fill: true,
                            yAxisID: 'y1',
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: { mode: 'index', intersect: false },
                        plugins: {
                            legend: { position: 'bottom', labels: { color: '#374151' } },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.dataset.label || '';
                                        if (label) { label += ': '; }
                                        if (context.parsed.y !== null) {
                                            label += new Intl.NumberFormat('en-US').format(context.parsed.y);
                                            if(context.dataset.yAxisID === 'y1') { label += ' M tons'; }
                                        }
                                        return label;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                                title: { display: true, text: 'Total Units (Cumulative)', color: '#365314' },
                                ticks: { color: '#365314' }
                            },
                            y1: {
                                type: 'linear',
                                display: true,
                                position: 'right',
                                title: { display: true, text: 'Annual CO2e Removed (M tons)', color: '#D4AF37' },
                                grid: { drawOnChartArea: false },
                                ticks: { color: '#D4AF37' }
                            },
                            x: { ticks: { color: '#374151' } }
                        }
                    }
                }
            };

            let charts = {};

            const createChart = async (id, config) => {
                const ctx = document.getElementById(id).getContext('2d');
                if (charts[id]) {
                    charts[id].destroy();
                }
                const ChartClass = await loadChart();
                ChartClass.register(window.povertyLinePlugin);
                charts[id] = new ChartClass(ctx, config);
            };


            // Wrap critical content loading to prevent errors from blocking display
            try {
                const sdgGrid = document.getElementById('sdg-grid');
                const sdgTooltip = document.getElementById('sdg-tooltip');

                if (!sdgGrid || !sdgTooltip) {
                    console.error('SDG elements not found in DOM');
                    return;
                }
                
                console.log('Creating SDG grid tiles with', sdgData.length, 'items (lazy loading applied)');
/*
            sdgData.forEach(goal => {
                const item = document.createElement('div');
                item.className = 'sdg-grid-item rounded-md p-2 cursor-pointer';
                const img = document.createElement('img');
                
                // Use imported Vite-processed images
                const goalNumber = goal.id;
                const goalImageKey = Object.keys(sdgImages).find(path => 
                    path.includes(`E-WEB-Goal-${String(goalNumber).padStart(2, '0')}.png`)
                );
                img.src = goalImageKey ? sdgImages[goalImageKey] : '';
                img.setAttribute('data-goal', goal.id);
                img.alt = `SDG Goal ${goal.id}`;
                img.className = 'w-full h-auto';
                item.appendChild(img);

                item.addEventListener('mouseover', () => {
                    sdgTooltip.textContent = goal.description;
                });
                item.addEventListener('mouseout', () => {
                    sdgTooltip.textContent = 'Hover over a goal to see our contribution.';
                });
                sdgGrid.appendChild(item);
            });
*/
            // Create SDG tiles dynamically with proper data attributes for async loading
            sdgData.forEach(goal => {
                const item = document.createElement('div');
                item.className = 'sdg-grid-item rounded-md p-2 cursor-pointer';

                const img = document.createElement('img');
                img.setAttribute('data-goal', goal.id);
                img.alt = `SDG Goal ${goal.id}`;
                img.className = 'w-full h-auto sdg-goal-img';
                // Placeholder while loading
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=';
                
                item.appendChild(img);

                item.addEventListener('mouseover', () => {
                    sdgTooltip.textContent = goal.description;
                });
                item.addEventListener('mouseout', () => {
                    sdgTooltip.textContent = 'Hover over a goal to see our contribution.';
                });
                sdgGrid.appendChild(item);
            });

            // Load SDG images after tiles are created
            setupSdgImages();

            // --- Add Dynamic Globe-Eco Tile ---
            const dynamicTile = document.createElement('div');
            dynamicTile.className = 'sdg-grid-item rounded-md p-2 cursor-pointer';
            const dynamicImg = document.createElement('img');
            dynamicImg.src = dynamicImgUrl;
            dynamicImg.alt = 'Globe-Eco Logo';
            dynamicImg.className = 'w-full h-auto';
            dynamicTile.appendChild(dynamicImg);

            dynamicTile.addEventListener('mouseover', () => {
                sdgTooltip.textContent = 'People, Planet, Prosperity';
            });
            dynamicTile.addEventListener('mouseout', () => {
                sdgTooltip.textContent = 'Hover over a goal to see our contribution.';
            });
            sdgGrid.appendChild(dynamicTile);

            // --- Observer for fade-in effect ---
            const fadeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        console.log('Making section visible:', entry.target.id);
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.section-fade-in').forEach(section => {
                console.log('Observing section:', section.id);
                fadeObserver.observe(section);
            });

            // --- Observer for Chart Animations ---
            const chartObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const canvasId = entry.target.id;
                        let chartConfigKey;

                        if (canvasId === 'peopleChart') chartConfigKey = 'people';
                        else if (canvasId === 'lcaChart') chartConfigKey = 'lca';
                        else if (canvasId === 'growthChart') chartConfigKey = 'growth';

                        const chartConfig = chartData[chartConfigKey];

                        if (chartConfig) {
                             createChart(canvasId, chartConfig);
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 }); 

            document.querySelectorAll('.chart-container canvas').forEach(canvas => {
                chartObserver.observe(canvas);
            });

            // --- Observer for SDG Tile Animation ---
            const sdgGridForAnimation = document.getElementById('sdg-grid');
            const sdgObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sdgItems = entry.target.querySelectorAll('.sdg-grid-item');
                        sdgItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('sdg-item-animate');
                                setTimeout(() => {
                                    item.classList.remove('sdg-item-animate');
                                }, 500); // Duration of the "highlight"
                            }, index * 100); // Staggered delay
                        });
                        observer.unobserve(entry.target); // Ensure it only runs once
                    }
                });
            }, { threshold: 0.5 });

            sdgObserver.observe(sdgGridForAnimation);

            } catch (error) {
                console.error('Error loading SDG grid and charts:', error);
            }

            // --- Unmute Button Logic ---
            const unmuteButton = document.getElementById('unmute-button');
            const video = document.getElementById('buko-joe-video');
            const muteIcon = document.getElementById('mute-icon');
            const unmuteIcon = document.getElementById('unmute-icon');

            if (unmuteButton && video && muteIcon && unmuteIcon) {
                unmuteButton.addEventListener('click', () => {
                    video.muted = !video.muted;
                    muteIcon.classList.toggle('hidden');
                    unmuteIcon.classList.toggle('hidden');
                });
            }


            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            document.querySelectorAll('#mobile-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });

            const header = document.getElementById('main-header');
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('main section');

            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (pageYOffset >= sectionTop - 80) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === current) {
                        link.classList.add('active');
                    }
                });
            });

            // --- Carbon Cycle Animation Setup ---
            const setupCarbonCycleAnimationV1 = () => {
                const particleRing = document.getElementById('particle-ring-v1');
                if (!particleRing) return;

                function spawnParticleRing() {
                    particleRing.innerHTML = ''; // Clear old particles
                    const numParticles = 12; 
                    const radius = 50; 

                    for (let i = 0; i < numParticles; i++) {
                        const angle = (i / numParticles) * 360;
                        const p = document.createElement('div');
                        p.className = 'co2-particle-v1';
                        p.textContent = 'CO₂';

                        const x = radius + radius * Math.cos(angle * Math.PI / 180);
                        const y = radius + radius * Math.sin(angle * Math.PI / 180);

                        p.style.left = `${x}%`;
                        p.style.top = `${y}%`;

                        particleRing.appendChild(p);                       }
                }
                spawnParticleRing();
            };

            const setupCarbonCycleAnimationV2 = () => {
                const particleContainer = document.getElementById('co2-particle-container-v2');
                if(!particleContainer) return;

                const pathHouseBase = document.getElementById('path-house-base');
                const pathHouseRoof = document.getElementById('path-house-roof');
                let houseLoopTimeout;

                let particleInterval;
                let particles = [];
                let animationFrameId_v2;

                function preparePath(pathElement) {
                    if(!pathElement) return;
                    const length = pathElement.getTotalLength();
                    pathElement.style.strokeDasharray = length;
                    pathElement.style.strokeDashoffset = length;
                    pathElement.style.opacity = '1';
                    pathElement.classList.remove('draw-animation');
                }

                function drawHouse() {
                    preparePath(pathHouseBase);
                    preparePath(pathHouseRoof);
                    // Removed forced reflow for performance
                    pathHouseBase.style.animationDuration = '2s';
                    pathHouseBase.classList.add('draw-animation');
                    setTimeout(() => {
                        pathHouseRoof.style.animationDuration = '1.5s';
                        pathHouseRoof.classList.add('draw-animation');
                    }, 2000);
                    houseLoopTimeout = setTimeout(clearHouse, 6500);
                }

                function clearHouse() {
                    pathHouseBase.style.opacity = '0';
                    pathHouseRoof.style.opacity = '0';
                    houseLoopTimeout = setTimeout(drawHouse, 2000);
                }

                function spawnParticle() {
                    const particle = {};
                    particle.element = document.createElement('div');
                    particle.element.className = 'co2-particle-v2';
                    particle.element.textContent = 'CO₂';
                    particle.startTime = Date.now();
                    particle.duration = 2500; 

                    particle.p0 = { x: 80, y: -10 }; 
                    particle.p1 = { x: 80, y: 200 }; 
                    particle.p2 = { x: 160, y: 300 }; 
                    particle.p3 = { x: 240, y: 260 }; 

                    particles.push(particle);
                    particleContainer.appendChild(particle.element);
                }

                function animateParticles() {
                    const now = Date.now();
                    for (let i = particles.length - 1; i >= 0; i--) {
                        const p = particles[i];
                        const timeElapsed = now - p.startTime;
                        let t = timeElapsed / p.duration;

                        if (t >= 1) {
                            p.element.remove();
                            particles.splice(i, 1);
                            continue;
                        }

                        const x = Math.pow(1 - t, 3) * p.p0.x + 3 * Math.pow(1 - t, 2) * t * p.p1.x + 3 * (1 - t) * t * t * p.p2.x + t * t * t * p.p3.x;
                        const y = Math.pow(1 - t, 3) * p.p0.y + 3 * Math.pow(1 - t, 2) * t * p.p1.y + 3 * (1 - t) * t * t * p.p2.y + t * t * t * p.p3.y;

                        p.element.style.transform = `translate(${x}px, ${y}px)`;
                    }
                    animationFrameId_v2 = requestAnimationFrame(animateParticles);
                }

                function runAnimation() {
                    clearTimeout(houseLoopTimeout);
                    clearInterval(particleInterval);
                    cancelAnimationFrame(animationFrameId_v2);
                    particleContainer.innerHTML = '';
                    particles = [];

                    drawHouse();
                    particleInterval = setInterval(spawnParticle, 500);
                    animateParticles();
                }
                runAnimation();
            };

            // --- Regenerative Core Animation ---
            const setupCoreAnimation = () => {
                const canvas = document.getElementById('coreAnimationCanvas');
                if (!canvas) return;
                //canvas.style.backgroundColor = '#0B1523'; // Set the background color
                const ctx = canvas.getContext('2d');
                let elements = {};
                let coreParticles = [];
                let coreAnimationStarted = false;
                let coreAnimationFrameId;

                const coreImages = {
                    frond: new Image(),
                    tree: new Image(),
                    sdg: new Image(),
                    cpu: new Image()
                };

                let coreLoadedCount = 0;
                const coreTotalImages = Object.keys(coreImages).length;

                function coreImageLoaded() {
                    coreLoadedCount++;
                    if (coreLoadedCount === coreTotalImages && !coreAnimationStarted) {
                        coreAnimationStarted = true;
                        coreSetup();
                        coreAnimate();
                    }
                }
/*
                coreImages.frond.src = '/assets/images/GE-PalmFrond.png';
                coreImages.tree.src = '/assets/images/CoconutTree.png';
                coreImages.sdg.src = '/assets/images/GE-SDG-Wheel.png';
                coreImages.cpu.src = '/images/GE-CPU-small.webp';

                Object.values(coreImages).forEach(img => {
                    img.onload = coreImageLoaded;
                    img.onerror = () => console.error(`Failed to load image: ${img.src}`);
                });
*/
                // 1. Import each image at the top of your script file


                // ... (the rest of your script)

                // 2. Use the imported variables to set the src attributes
                coreImages.frond.src = palmFrondUrl;
                coreImages.tree.src = coconutTreeUrl;
                coreImages.sdg.src = sdgWheelUrl;
                coreImages.cpu.src = '/images/GE-CPU-small.webp';

                Object.values(coreImages).forEach(img => {
                    img.onload = coreImageLoaded;
                    img.onerror = () => console.error(`Failed to load image: ${img.src}`);
                });

                function coreSetup() {
                    const parent = canvas.parentElement;
                    const dpr = window.devicePixelRatio || 1;
                    // Batch layout reads to avoid forced reflows
                    const parentWidth = parent.clientWidth;
                    const parentHeight = parent.clientHeight;
                    canvas.width = parentWidth * dpr;
                    canvas.height = parentHeight * dpr;
                    ctx.scale(dpr, dpr);
                    const w = parentWidth;
                    const h = parentHeight;

                    elements = {
                    tree: { x: w * 0.15, y: h * 0.7, width: w * 0.12, height: (w * 0.12) * (coreImages.tree.height / coreImages.tree.width) },
                    tree2: { x: w * 0.08, y: h * 0.7, width: w * 0.10, height: (w * 0.10) * (coreImages.tree.height / coreImages.tree.width) },
                    tree3: { x: w * 0.03, y: h * 0.7, width: w * 0.08, height: (w * 0.08) * (coreImages.tree.height / coreImages.tree.width) },
                    conveyor: { y: h * 0.7, startX: w * 0.22, endX: w * 0.45 },
                    fronds: [],
                    core: { x: w * 0.5, y: h * 0.7, radius: w * 0.07, glow: 1, glowSpeed: 0.05, pulsing: false, pulseDuration: 100, pulseTimer: 0 },
                    carbonCounter: { value: 0, increment: 0.125 },
                    sdg: { x: w * 0.5, y: h * 0.25, size: w * 0.08 * 1.5, rotation: 0 },
                    house: { x: w * 0.8, y: h * 0.7, width: w * 0.1, height: w * 0.075, buildProgress: 0, maxProgress: 100, state: 'ready', completionTime: 0 },
                    captions: {
                        texts: [
                            "CO2 infused plantation waste",
                            "Funding plantation CO2 productivity", 
                            "Economic Engine funds CO2-benefits",
                            "CO2 durably stored"
                        ],
                        positions: [
                            { x: w * 0.15, y: h * 0.85 }, // Lower left
                            { x: w * 0.15, y: h * 0.15 }, // Upper left
                            { x: w * 0.85, y: h * 0.15 }, // Upper right
                            { x: w * 0.85, y: h * 0.85 }  // Lower right
                        ],
                        currentIndex: 0,
                        alpha: 0,
                        state: 'FADING_IN', // FADING_IN, SHOWING, FADING_OUT
                        lastChange: Date.now(),
                        showDuration: 3000, // 3 seconds to read
                        fadeDuration: 500   // 0.5 seconds to fade
                    }
                };
                    initCoreFronds();
                }

                function initCoreFronds() {
                    const w = canvas.clientWidth;
                    const numFronds = 3;
                    const spacing = w * 0.15;
                    elements.fronds = [];
                    for (let i = 0; i < numFronds; i++) {
                        elements.fronds.push({
                            id: i,
                            x: elements.conveyor.startX - (numFronds - i) * spacing,
                            y: canvas.clientHeight * 0.7 - 10,
                            width: w * 0.1,
                            height: (w * 0.1) * (coreImages.frond.height / coreImages.frond.width),
                            speed: 2, // Increased by another 30% (1.04 * 1.3)
                            co2Particle: {
                                offsetX: (Math.random() * 0.4 + 0.3) * (w * 0.1),
                                offsetY: (Math.random() - 0.5) * ((w * 0.1) * (coreImages.frond.height / coreImages.tree.width)) * 0.5,
                                radius: w * 0.008,
                                opacity: 1
                            }
                        });
                    }
                }

                function createCoreParticle(originX, originY, type) {
                    let targetX, targetY, color, life, vx, vy, radius;

                    if (type === 'carbonRay') {
                        targetX = elements.house.x;
                        targetY = elements.core.y; 
                        color = `rgba(150, 150, 150, 0.5)`;
                        life = 80;
                        radius = Math.random() * 2 + 1;
                        vx = (targetX - originX) / life;
                        vy = (targetY - originY) / life;
                    } else if (type === 'value') { 
                        targetX = elements.sdg.x;
                        targetY = elements.sdg.y;
                        color = `rgba(252, 211, 77, ${Math.random() * 0.5 + 0.5})`;
                        life = 120;
                        radius = Math.random() * 2 + 1;
                        vx = (targetX - originX) / life;
                        vy = (targetY - originY) / life;
                    } else if (type === 'rejuvenation') {
                        targetX = elements.tree.x;
                        targetY = elements.tree.y - elements.tree.height / 2;
                        color = `rgba(74, 222, 128, ${Math.random() * 0.5 + 0.5})`;
                        life = 120;
                        radius = Math.random() * 2.5 + 1.5;
                        vx = (targetX - originX) / life;
                        vy = (targetY - originY) / life;
                    }

                    if(vx !== undefined) coreParticles.push({ x: originX, y: originY, vx, vy, radius, color, type, life });
                }

                function drawCoreScene() {
                    if (!elements) return;
                    const { house, sdg, tree, tree2, tree3 } = elements;

                    ctx.save();
                    ctx.translate(tree3.x, 0);
                    ctx.scale(-1, 1);
                    ctx.drawImage(coreImages.tree, -tree3.width / 2, tree3.y - tree3.height, tree3.width, tree3.height);
                    ctx.restore();

                    ctx.save();
                    ctx.translate(tree2.x, 0);
                    ctx.scale(-1, 1);
                    ctx.drawImage(coreImages.tree, -tree2.width / 2, tree2.y - tree2.height, tree2.width, tree2.height);
                    ctx.restore();

                    ctx.save();
                    ctx.translate(tree.x, 0);
                    ctx.scale(-1, 1);
                    ctx.drawImage(coreImages.tree, -tree.width / 2, tree.y - tree.height, tree.width, tree.height);
                    ctx.restore();

                    ctx.save();
                    ctx.translate(sdg.x, sdg.y);
                    ctx.rotate(sdg.rotation);
                    ctx.drawImage(coreImages.sdg, -sdg.size / 2, -sdg.size / 2, sdg.size, sdg.size);
                    ctx.restore();
                }

                function drawCoreConveyor() {
                    if (!elements || !elements.conveyor) return;
                    const { y, startX, endX } = elements.conveyor;
                    ctx.strokeStyle = '#475569';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(startX, y);
                    ctx.lineTo(endX, y);
                    ctx.stroke();
                }

                function drawCoreFronds() {
                    if (!elements || !elements.fronds) return;
                    elements.fronds.forEach(frond => {
                        ctx.drawImage(coreImages.frond, frond.x, frond.y - frond.height, frond.width, frond.height);
                        const p = frond.co2Particle;
                        if (p && p.opacity > 0) {
                            ctx.globalAlpha = p.opacity;
                            const pX = frond.x + p.offsetX;
                            const pY = frond.y - frond.height/2 + p.offsetY;
                            ctx.fillStyle = `rgba(203, 213, 225, 1)`;
                            ctx.beginPath();
                            ctx.arc(pX, pY, p.radius, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = 'black';
                            ctx.font = `bold ${p.radius * 1.2}px Inter`;
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('C', pX, pY);
                            ctx.globalAlpha = 1;
                        }
                    });
                }

                function drawMainCore() {
                    if (!elements || !elements.core) return;
                    const { x, y, radius, glow } = elements.core;
                    const glowRadius = radius * 1.2 * glow;
                    const gradGlow = ctx.createRadialGradient(x, y, radius * 0.7, x, y, glowRadius);
                    gradGlow.addColorStop(0, 'rgba(56, 189, 248, 0.5)');
                    gradGlow.addColorStop(1, 'rgba(56, 189, 248, 0)');
                    ctx.fillStyle = gradGlow;
                    ctx.beginPath();
                    ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
                    ctx.fill();

                    const gradCore = ctx.createRadialGradient(x, y, 0, x, y, radius);
                    gradCore.addColorStop(0, 'rgba(207, 250, 254, 1)');
                    gradCore.addColorStop(0.7, 'rgba(56, 189, 248, 1)');
                    gradCore.addColorStop(1, 'rgba(14, 116, 144, 1)');
                    ctx.fillStyle = gradCore;
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fill();

                    const logoSize = radius * 1.2;
                    // Remove any shadows or outlines from CPU
                    ctx.shadowColor = 'transparent';
                    ctx.shadowBlur = 0;
                    ctx.drawImage(coreImages.cpu, x - logoSize / 2, y - logoSize / 2, logoSize, logoSize);
                }

                function drawCoreCarbonCounter() {
                    if (!elements || !elements.core) return;
                    const { x, y } = elements.core;
                    ctx.fillStyle = 'white';
                    ctx.font = `bold ${canvas.clientWidth * 0.015}px Inter`;
                    ctx.textAlign = 'center';
                    ctx.fillText(`Carbon Dioxide: ${Math.floor(elements.carbonCounter.value)} T`, x, y + elements.core.radius + 25);
                }

                function drawCoreParticles() {
                    const sdg = elements.sdg;
                    coreParticles.forEach((p, index) => {
                        p.x += p.vx;
                        p.y += p.vy;
                        p.life--;

                        let remove = p.life <= 0;
                        if (p.type === 'value') {
                            const dx = p.x - sdg.x;
                            const dy = p.y - sdg.y;
                            if (Math.sqrt(dx * dx + dy * dy) < sdg.size / 2) remove = true;
                        } else if (p.type === 'carbonRay') {
                           if (p.x >= elements.house.x) remove = true;
                        }

                        if (remove) {
                            if (p.type === 'carbonRay' && elements.house.buildProgress < elements.house.maxProgress && elements.house.state === 'building') {
                                elements.house.buildProgress += 2;
                                // Check if house just completed
                                if (elements.house.buildProgress >= elements.house.maxProgress) {
                                    elements.house.state = 'completed';
                                    elements.house.completionTime = Date.now();
                                }
                            }
                            coreParticles.splice(index, 1);
                        } else {
                            ctx.beginPath();
                            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                            ctx.fillStyle = p.color;
                            ctx.fill();
                        }
                    });
                }

                function drawCoreBuildingHouse() {
                    if (!elements || !elements.house) return;
                    const { x, y, width, height, buildProgress, state } = elements.house;
                    ctx.strokeStyle = '#64748b';
                    ctx.lineWidth = 2;

                    // Only draw if there's progress or house is completed
                    if (buildProgress > 0 || state === 'completed') {
                        const currentProgress = Math.min(buildProgress, 100);

                        // Foundation
                        if (currentProgress > 0) {
                            ctx.fillStyle = '#94a3b8';
                            const foundationHeight = height * 0.1;
                            ctx.fillRect(x, y - foundationHeight, width, foundationHeight);
                            ctx.strokeRect(x, y - foundationHeight, width, foundationHeight);
                        }

                        // Walls
                        const wallProgress = Math.max(0, Math.min(1, (currentProgress - 10) / 50));
                        if (wallProgress > 0) {
                            const maxWallHeight = height * 0.375;
                            const wallHeight = maxWallHeight * wallProgress;
                            ctx.fillStyle = '#d1d5db';
                            ctx.fillRect(x, y - height * 0.1 - wallHeight, width, wallHeight);
                            ctx.strokeRect(x, y - height * 0.1 - wallHeight, width, wallHeight);
                        }

                        // Roof
                        const roofProgress = Math.max(0, (currentProgress - 60) / 40);
                        if (roofProgress > 0) {
                            ctx.fillStyle = '#4b5563';
                            ctx.globalAlpha = roofProgress;
                            ctx.beginPath();
                            ctx.moveTo(x - 5, y - height * 0.475);
                            ctx.lineTo(x + width / 2, y - height * 0.75);
                            ctx.lineTo(x + width + 5, y - height * 0.475);
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();
                            ctx.globalAlpha = 1;
                        }
                    }
                }

                function updateCaptions(now) {
                     if (!elements || !elements.captions) return;
                     const { captions } = elements;
                     const { state, fadeDuration, showDuration } = captions;
                     const elapsed = now - captions.lastChange;

                     switch(state) {
                         case 'FADING_IN':
                             captions.alpha = Math.min(1, captions.alpha + elapsed / fadeDuration);
                             if(captions.alpha >= 1) {
                                 captions.alpha = 1;
                                 captions.state = 'SHOWING';
                                 captions.lastChange = now;
                             }
                             break;
                         case 'SHOWING':
                             if(elapsed >= showDuration) {
                                 captions.state = 'FADING_OUT';
                                 captions.lastChange = now;
                             }
                             break;
                         case 'FADING_OUT':
                             captions.alpha = Math.max(0, captions.alpha - elapsed / fadeDuration);
                             if(captions.alpha <= 0) {
                                 captions.alpha = 0;
                                 captions.state = 'FADING_IN';
                                 captions.currentIndex = (captions.currentIndex - 1 + captions.texts.length) % captions.texts.length;
                                 captions.lastChange = now;
                             }
                             break;
                     }
                }

                function drawCoreCaptions() {
                    if (!elements || !elements.captions) return;
                    const { captions } = elements;
                    const { texts, positions, currentIndex, alpha } = captions;
                    const position = positions[currentIndex];

                    ctx.save();
                    ctx.globalAlpha = alpha;
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.font = `bold ${canvas.clientWidth * 0.015}px Inter`;
                    ctx.textAlign = 'center';
                    ctx.fillText(texts[currentIndex], position.x, position.y);
                    ctx.restore();
                }

                function coreUpdate() {
                    if (!elements || !elements.core || !elements.fronds || !elements.house || !elements.sdg) return;
                    const { core, fronds, house, sdg } = elements;
                    const spacing = canvas.clientWidth * 0.15;
                    const totalConveyorLength = spacing * fronds.length;

                    sdg.rotation -= 0.002;

                    fronds.forEach(frond => {
                        const prevX = frond.x;
                        frond.x += frond.speed;

                        const distanceToCore = (core.x - core.radius) - (frond.x + frond.width * 0.8);
                        if (frond.co2Particle) frond.co2Particle.opacity = Math.max(0, distanceToCore / 50);

                        // Check if frond just entered the core's influence zone
                        const coreInfluenceZone = core.x - core.radius * 2;
                        const justEnteredZone = prevX < coreInfluenceZone && frond.x >= coreInfluenceZone;

                        if (frond.x > core.x - core.radius) {
                            frond.x -= totalConveyorLength;

                            // Only start building if house is ready
                            if (house.state === 'ready') {
                                house.state = 'building';
                            }

                            if (frond.co2Particle) frond.co2Particle.opacity = 1;
                        }

                        // Trigger pulse when frond enters core influence zone
                        if (justEnteredZone) {
                            core.pulsing = true;
                            core.pulseTimer = core.pulseDuration;
                            core.glowSpeed = Math.abs(core.glowSpeed); // Ensure we start with positive glow direction
                        }
                    });

                    if (core.pulsing) {
                        // More dynamic pulsing with smoother transitions
                        core.glow += core.glowSpeed;

                        // Smoother pulse cycle with variable speed
                        if (core.glow >= 1.8) {
                            core.glowSpeed = -0.08; // Faster fade down
                        } else if (core.glow <= 1.0) {
                            core.glowSpeed = 0.06; // Slower build up
                        }

                        if (core.pulseTimer > 0) {
                            core.pulseTimer--;
                            elements.carbonCounter.value += elements.carbonCounter.increment;
                        } else {
                            core.pulsing = false;
                            // Ensure we end at normal glow
                            core.glow = Math.max(1.0, core.glow - 0.05);
                        }
                    } else {
                        // Gentle return to baseline when not pulsing
                        if (core.glow > 1.0) {
                            core.glow = Math.max(1.0, core.glow - 0.03);
                        } else {
                            core.glow = 1.0;
                        }
                    }

                    // Continuously create particles flowing from fronds to house
                    if (Math.random() > 0.7) {
                        createCoreParticle(core.x, core.y, 'carbonRay');
                    }

                    if (house.state === 'building' && house.buildProgress > 0 && house.buildProgress < house.maxProgress) {
                        if (Math.random() > 0.8) {
                            createCoreParticle(house.x + house.width / 2, house.y - house.height / 2, 'value');
                        }
                    }

                    if (Math.random() > 0.95) {
                        createCoreParticle(sdg.x, sdg.y, 'rejuvenation');
                    }

                    // Handle house state transitions
                    if (house.state === 'completed' && Date.now() - house.completionTime > 4000) {
                        // Reset house with visual fade effect
                        house.buildProgress = 0;
                        house.state = 'ready';
                        house.completionTime = 0;
                    }

                    updateCaptions(Date.now());
                }

                function coreAnimate() {
                    coreAnimationFrameId = requestAnimationFrame(coreAnimate);
                    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

                    drawCoreScene();
                    drawCoreConveyor();
                    drawMainCore();
                    drawCoreCarbonCounter();
                    drawCoreFronds();
                    drawCoreBuildingHouse();
                    drawCoreParticles();
                    drawCoreCaptions();

                    coreUpdate();

                 }

                window.addEventListener('resize', () => {
                    if(coreAnimationStarted) coreSetup();
                });
            }

            // Initialize all animations on DOM load
            setupCarbonCycleAnimationV1();
            setupCarbonCycleAnimationV2();
            setupCoreAnimation();

        //250903 Add form processing

            const contactGrid = document.getElementById('contact-grid');
            const modals = document.querySelectorAll('.modal');
            const closeButtons = document.querySelectorAll('.modal button[class*="absolute"]');
            let activeEmail = '';

            function openModal(modalId, email) {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.remove('hidden');
                    modal.classList.add('visible');
                    activeEmail = email;
                }
            }

            function closeModal(modal) {
                modal.classList.add('hidden');
                modal.classList.remove('visible');
                const form = modal.querySelector('form');
                if (form) {
                    form.reset();
                    clearError(form);
                    // Reset Turnstile widget if it exists
                    if (window.turnstile) {
                        const widget = form.querySelector('.cf-turnstile');
                        if (widget) {
                            turnstile.reset(widget);
                        }
                    }
                }
            }

            // Add event listener to the specific contact grid
            if (contactGrid) {
                contactGrid.addEventListener('click', (e) => {
                    // Find the card that was clicked by traversing up the DOM tree
                    const card = e.target.closest('.card');
                    if (card) {
                        const modalId = card.dataset.modal;
                        const email = card.dataset.email;
                        if (modalId && email) {
                            openModal(modalId, email);
                        }
                    }
                });
            }


            closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    closeModal(button.closest('.modal'));
                });
            });

            modals.forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        closeModal(modal);
                    }
                });
                const form = modal.querySelector('form');
                if (form) {
                    form.addEventListener('submit', (e) => handleSubmit(e, form));
                }
            });

            function showError(form, message) {
                const errorDiv = form.querySelector('.error-message');
                errorDiv.textContent = message;
            }

            function clearError(form) {
                const errorDiv = form.querySelector('.error-message');
                errorDiv.textContent = '';
            }

            function isValidEmailFormat(email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }

            async function handleSubmit(e, form) {
                e.preventDefault();
                clearError(form);
                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';

                const formData = new FormData(form);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                const token = formData.get('cf-turnstile-response');

                if (!name || !email || !message) {
                    showError(form, 'Please fill out all required fields.');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit';
                    return;
                }

                if (!isValidEmailFormat(email)) {
                    showError(form, 'Please enter a valid email address.');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit';
                    return;
                }

                if (!token) {
                    showError(form, 'CAPTCHA challenge failed. Please refresh and try again.');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit';
                    return;
                }

                try {
                    // **IMPORTANT: REPLACE WITH YOUR WORKER URL**
                    const response = await fetch('https://api.globe-eco.com', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                             // Cache-busting headers
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache',
                            'Expires': '0',
                        },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            message: message,
                            emailTo: activeEmail,
                            token: token,
                        }),
                    });

                    const result = await response.json();

                    if (response.ok) {
                        // Replace form content with success message only
                        form.innerHTML = `<div class="text-center"><h3 class="text-2xl font-bold text-green-400 mb-2">Thank You!</h3><p class="text-white">Your message has been sent successfully.</p></div>`;
                    } else {
                        // **UPDATED:** Display the detailed error from the worker
                        showError(form, result.message || 'An unknown server error occurred.');
                    }
                } catch (error) {
                    showError(form, 'A network error occurred. Please try again.');
                } finally {
                    // Re-enable the button only if there was an error and the form wasn't replaced
                    if (form.querySelector('button[type="submit"]')) {
                         submitButton.disabled = false;
                         submitButton.textContent = 'Submit';
                    }
                }
            }
            });


        // End form processing

    // Initialize Google Analytics
    initGA();
    
    // Track initial page view
    trackPageView();
    
    // Add scroll depth tracking
    let scrollTrackingEnabled = false;
    const enableScrollTracking = () => {
        if (!scrollTrackingEnabled) {
            window.addEventListener('scroll', trackScrollDepth, { passive: true });
            scrollTrackingEnabled = true;
        }
    };
    
    // Add time on page tracking
    let timeTrackingInterval;
    const startTimeTracking = () => {
        timeTrackingInterval = setInterval(trackTimeOnPage, 30000); // Every 30 seconds
    };
    
    // Track engagement events
    const trackEngagementEvents = () => {
        // Track clicks on important elements
        document.addEventListener('click', (e) => {
            if (e.target.closest('button') || e.target.closest('a')) {
                const element = e.target.closest('button') || e.target.closest('a');
                const text = element.textContent?.trim().substring(0, 50) || 'unknown';
                trackEvent('click', 'navigation', text);
            }
        });
        
        // Track section visibility
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    trackEvent('section_view', 'engagement', sectionId);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe all major sections
        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    };

    // Initialize analytics tracking
    setTimeout(() => {
        enableScrollTracking();
        startTimeTracking();
        trackEngagementEvents();
        // Initialize enhanced scroll spy and progress bar
        initializeScrollSpyAndProgress();
    }, 1000); // Delay to ensure DOM is fully loaded

    // Enhanced Scroll Spy and Progress Bar Implementation
    function initializeScrollSpyAndProgress() {
        const progressBar = document.getElementById('progress-bar');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        if (!progressBar || sections.length === 0) return;

        // Cache section positions to avoid repeated layout reads
        let sectionPositions = [];
        function cacheSectionPositions() {
            sectionPositions = Array.from(sections).map(section => ({
                id: section.id,
                top: section.offsetTop - 100,
                bottom: section.offsetTop + section.offsetHeight
            }));
        }
        
        // Initial cache and recache on resize
        cacheSectionPositions();
        window.addEventListener('resize', cacheSectionPositions);
        
        function updateNavigationAndProgress() {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            // Guard against edge case where document height equals viewport height
            const scrollPercent = documentHeight <= 0 ? 0 : Math.min((scrollTop / documentHeight) * 100, 100);
            
            // Update progress bar
            progressBar.style.width = scrollPercent + '%';
            
            // Update active navigation link using cached positions
            let activeSection = '';
            for (const section of sectionPositions) {
                if (scrollTop >= section.top && scrollTop < section.bottom) {
                    activeSection = section.id;
                    break;
                }
            }
            
            // Update nav link active states
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + activeSection) {
                    link.classList.add('active');
                }
            });
        }

        // Throttled scroll handler for performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                updateNavigationAndProgress();
                scrollTimeout = null;
            }, 16); // ~60fps
        }, { passive: true });
        
        // Initial call
        updateNavigationAndProgress();

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Track navigation click
                    trackEvent('click', 'navigation', targetId);
                }
            });
        });
    }


