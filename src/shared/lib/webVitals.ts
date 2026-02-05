// src/shared/lib/webVitals.ts
import type { Metric } from 'next/web-vitals';

export function reportWebVitals(metric: Metric) {
  // --- ADD THIS LINE FOR DEBUGGING ---
  console.log('reportWebVitals called:', metric);
  
  // The `/api/metrics` endpoint is the one we just created.
  const url = '/api/metrics';
  const body = JSON.stringify({ name: metric.name, value: metric.value });

  // Use `navigator.sendBeacon` if available, as it's more reliable
  // for sending data just before a page unloads.
  // Fall back to a standard fetch POST request.
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, {
      body,
      method: 'POST',
      keepalive: true, // keepalive is important for reliability on page unload
    });
  }
}
