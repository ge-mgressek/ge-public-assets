// runs for EVERY path (/, /about, /api/anything, etc.)
export async function onRequest(context) {
  const { request, env } = context;

  // Best-effort write to Analytics Engine
  try {
    const url = new URL(request.url);
    const cf = request.cf || {};
    await env.ANALYTICS.writeDataPoint({
      indexes: [
        url.pathname,               // path
        cf.country || 'XX',         // country
        200                         // we don't have the asset's status yet; 200 is fine for counts
      ],
      blobs: [
        request.headers.get('user-agent') || '',
        request.headers.get('referer') || '',
        cf.ray || request.headers.get('cf-ray') || ''
      ],
    });
  } catch (err) {
    // don't break the site if AE write fails
    console.error('AE write failed:', err);
  }

  // Hand the request to your built assets (your Vite `dist/` output)
  return env.ASSETS.fetch(request);
}
