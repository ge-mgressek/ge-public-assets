// File: functions/api/hello.js

export function onRequest(context) {
  // context object contains request, env, etc.
  
  return new Response("Hello, World!", {
    headers: { 'Content-Type': 'text/plain' },
  });
}