// File: functions/_middleware.js
// This middleware captures analytics data for each request and logs it using
// the Analytics Engine (AE) bound to the environment variable ANALYTICS.
export async function onRequest(context) {
  const response = await context.next();

  // Hand the promise to waitUntil so the write can complete after the response
  context.waitUntil(writeAE(context.env.ANALYTICS, context.request, response.status));

  return response;
}

async function writeAE(analytics, request, status) {
  const url = new URL(request.url);
  const cf = request.cf || {};

  // Return the promise so waitUntil can track it
  return analytics.writeDataPoint({
    indexes: [
      url.pathname,           // index1: path
      cf.country || 'XX',     // index2: country
      status                  // index3: HTTP status
    ],
    blobs: [
      request.headers.get('user-agent') || '',
      request.headers.get('referer') || '',
      cf.ray || request.headers.get('cf-ray') || ''
    ],
  });
}
