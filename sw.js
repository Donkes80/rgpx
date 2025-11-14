self.addEventListener("fetch", event => {
  const url = event.request.url;

  // evităm să logăm log-ul însuși (altfel intră în buclă infinită)
  if (url.includes("/api/log")) {
    return event.respondWith(fetch(event.request));
  }

  const logData = {
    url: url,
    method: event.request.method,
    type: "resource"
  };

  // trimitem log fără să blocăm încărcarea paginii
  fetch("/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(logData),
    keepalive: true
  }).catch(() => {});

  event.respondWith(fetch(event.request));
});
