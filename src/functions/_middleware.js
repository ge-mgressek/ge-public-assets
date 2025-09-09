// File: functions/_middleware.js

export async function onRequest(context) {
  // Always call next() to continue to the requested page
  const response = await context.next();

  // Use waitUntil to perform analytics in the background without blocking the response
  context.waitUntil(logAnalytics(context));

  return response;
}

async function logAnalytics(context) {
  // Get the binding to our Analytics Engine dataset
  const analytics = context.env.ANALYTICS;

  // Get data from the request and Cloudflare's metadata
  const request = context.request;
  const cf = request.cf;
  const url = new URL(request.url);

  // Send the data point to the Analytics Engine
  analytics.writeDataPoint({
    // Use indexes for data you want to filter or group by in your queries.
    // Index names (index1, index2, etc.) are fixed. You decide what they represent.
    // We'll map: index1=Path, index2=Country, index3=Status
    "indexes": [
      url.pathname,         // index1: The page path (e.g., '/', '/about')
      cf.country ?? 'XX',   // index2: Visitor's country code (e.g., 'US')
      response.status       // index3: The response status code (e.g., 200)
    ],
    // Use blobs for high-cardinality data you just want to store and view.
    "blobs": [
      request.headers.get('User-Agent') ?? '', // blob1: User-Agent
      request.headers.get('Referer') ?? '',    // blob2: Referrer
      cf.ray,                                  // blob3: Cloudflare Ray ID
    ],
  });
}