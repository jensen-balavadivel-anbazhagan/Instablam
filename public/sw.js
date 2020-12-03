self.addEventListener('install', (e) => {
  console.log('Service worker installedW: ', new Date().toLocaleTimeString())
  e.waitUntil(
    caches.open('v1').then((cache) => cache.addAll([
      '/index.html',
      '/manifest.json',
      '/images/icon-152x152.png',
      'offline.html'
    ])))
  
});

self.addEventListener('activate', (e) => {
  console.log('SW has been activated at: ', new Date().toLocaleTimeString())
});

self.addEventListener('fetch', (e) => {
  if (!navigator.onLine) {
    e.respondWith(
      caches.match(e.request).then((res) => {
        if (res!== undefined) {
          return res
        } else {
          return caches.match(new Request('offline.html'))
        }
      })
    )
  } else {
    e.respondWith(fetch(e.request).then(res => {
      let clone = res.clone();
      caches.open('v1').then(cache => {
        cache.put(e.req, clone);
      })
      return res;
    })
    )
  }
});

self.addEventListener("push", (event) => {
  if (event.data) {
    var obj = event.data.json();

    createNotification(obj.text, obj.body);
  }
});

const createNotification = (text, body) => {
  self.registration.showNotification(text, {
    body: body,
    icon: "favicon.png",
  });
};

