// File: functions/_middleware.js
// This middleware captures analytics data for each request and logs it using
// the Analytics Engine (AE) bound to the environment variable ANALYTICS.
// _middleware.js
export async function onRequest(context) {
  const { request, env, next } = context;
  
  // Get the start time for performance tracking
  const startTime = Date.now();
  
  try {
    // Process the request
    const response = await next();
    
    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // Extract useful data from the request
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || 'direct';
    const cfCountry = request.cf?.country || 'unknown';
    const cfRay = request.headers.get('cf-ray') || 'unknown';
    
    // Write data point to Analytics Engine
    // Make sure you have ANALYTICS binding configured in Dashboard
    if (env.ANALYTICS) {
      env.ANALYTICS.writeDataPoint({
        // Blobs (strings) - dimensions for filtering/grouping
        blobs: [
          url.pathname,           // blob1: Page path
          request.method,         // blob2: HTTP method
          response.status.toString(), // blob3: Status code
          cfCountry,              // blob4: Country
          userAgent.substring(0, 100), // blob5: User agent (truncated)
          referer.substring(0, 100),   // blob6: Referer (truncated)
          url.hostname            // blob7: Hostname
        ],
        // Doubles (numbers) - numeric values to record
        doubles: [
          responseTime,           // double1: Response time in ms
          response.headers.get('content-length') || 0 // double2: Response size
        ],
        // Indexes (strings) - for sampling (only one allowed currently)
        indexes: [cfRay]
      });
    }
    else {
      console.warn('ANALYTICS binding is not configured.');
    } 
    
    return response;
    
  } catch (error) {
    // Log errors to Analytics Engine as well
    if (env.ANALYTICS) {
      env.ANALYTICS.writeDataPoint({
        blobs: [
          url.pathname,
          request.method,
          'error',
          cfCountry,
          error.name || 'UnknownError',
          error.message.substring(0, 100),
          url.hostname
        ],
        doubles: [
          Date.now() - startTime, // Time until error
          0                       // No response size for errors
        ],
        indexes: [request.headers.get('cf-ray') || 'unknown']
      });
    }
    
    // Re-throw the error to maintain normal error handling
    throw error;
  }
}