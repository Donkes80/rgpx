self.addEventListener("fetch", (event) => {
  const req = event.request;

  // trimite info către API-ul nostru de logging
  fetch("/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: req.url,
      method: req.method
    })
  });

  event.respondWith(fetch(req));
});
