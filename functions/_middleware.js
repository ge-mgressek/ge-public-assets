// File: functions/_middleware.js

// Helper function to handle analytics logging
async function logAnalytics(context, response, startTime) {
  const { request, env } = context;

  // Ensure the ANALYTICS binding is configured
  if (!env.ANALYTICS) {
    console.warn('ANALYTICS binding is not configured.');
    return;
  }

  // Calculate response time
  const responseTime = Date.now() - startTime;

  // Extract useful data
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const referer = request.headers.get('referer') || 'direct';
  const cfCountry = request.cf?.country || 'unknown';
  const cfRay = request.headers.get('cf-ray') || 'unknown';

  // Write the data point
  env.ANALYTICS.writeDataPoint({
    blobs: [
      url.pathname,                     // blob1: Page path
      request.method,                   // blob2: HTTP method
      response.status.toString(),       // blob3: Status code
      cfCountry,                        // blob4: Country
      userAgent.substring(0, 100),      // blob5: User agent (truncated)
      referer.substring(0, 100),        // blob6: Referer (truncated)
      url.hostname                      // blob7: Hostname
    ],
    doubles: [
      responseTime,                     // double1: Response time in ms
      Number(response.headers.get('content-length') || 0) // double2: Response size
    ],
    indexes: [cfRay]
  });
}

// Main middleware handler
export async function onRequest(context) {
  const startTime = Date.now();
  try {
    // Await the next function to get the response
    const response = await context.next();

    // *** THE CRITICAL FIX IS HERE ***
    // Perform analytics in the background without blocking the response
    context.waitUntil(logAnalytics(context, response, startTime));

    return response;

  } catch (error) {
    // In case of an error, still try to log it, then re-throw
    // Note: We don't have a 'response' object here
    if (context.env.ANALYTICS) {
      const errorResponse = new Response(error.message, { status: 500 });
      context.waitUntil(logAnalytics(context, errorResponse, startTime));
    }
    // Re-throw the error so Cloudflare handles it
    throw error;
  }
}