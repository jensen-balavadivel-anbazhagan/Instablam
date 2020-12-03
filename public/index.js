function registerSW() {
  navigator.serviceWorker.register('sw.js').then(() => {
    console.log(
      'Service worker has been registered at: ',
      new Date().toLocaleTimeString()
    )
  })
}

registerSW()
