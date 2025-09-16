// Google Analytics 4 integration with performance optimization
// Async loading to minimize performance impact

// Initialize Google Analytics
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('Missing Google Analytics Measurement ID');
    return;
  }

  // Use requestIdleCallback for better performance
  const loadGA = () => {
    // Add Google Analytics script to the head
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId, {
      // Performance optimizations
      send_page_view: false, // We'll handle page views manually
      anonymize_ip: true,
      cookie_flags: 'SameSite=Strict;Secure'
    });
  };

  // Load GA when browser is idle or after 2 seconds max
  if (window.requestIdleCallback) {
    window.requestIdleCallback(loadGA, { timeout: 2000 });
  } else {
    setTimeout(loadGA, 100);
  }
};

// Track page views - useful for single-page applications
export const trackPageView = (url = window.location.pathname) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;
  
  window.gtag('config', measurementId, {
    page_path: url
  });
};

// Track events with throttling to prevent spam
let eventQueue = [];
let isProcessingEvents = false;

export const trackEvent = (action, category = 'engagement', label = '', value = null) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  // Add to queue to prevent overwhelming GA
  eventQueue.push({ action, category, label, value, timestamp: Date.now() });
  
  if (!isProcessingEvents) {
    processEventQueue();
  }
};

const processEventQueue = () => {
  isProcessingEvents = true;
  
  // Process events in batches to minimize performance impact
  const processNext = () => {
    if (eventQueue.length === 0) {
      isProcessingEvents = false;
      return;
    }
    
    const event = eventQueue.shift();
    
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
    
    // Small delay between events to prevent overwhelming
    setTimeout(processNext, 50);
  };
  
  processNext();
};

// Track scroll depth
let maxScrollDepth = 0;
let scrollTimeout = null;

export const trackScrollDepth = () => {
  const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  
  if (scrollPercent > maxScrollDepth && scrollPercent >= 25) {
    maxScrollDepth = Math.floor(scrollPercent / 25) * 25; // Round to nearest 25%
    
    // Debounce scroll tracking
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      trackEvent('scroll_depth', 'engagement', `${maxScrollDepth}%`);
    }, 500);
  }
};

// Track time on page
let startTime = Date.now();

export const trackTimeOnPage = () => {
  const timeSpent = Math.round((Date.now() - startTime) / 1000);
  
  // Track significant time milestones
  if (timeSpent >= 30 && timeSpent % 30 === 0 && timeSpent <= 300) {
    trackEvent('time_on_page', 'engagement', `${timeSpent}s`);
  }
};