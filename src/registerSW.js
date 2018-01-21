export default function registerSW() {
  if (__DEV__) {
    return Promise.resolve('DEVELOPMENT');
  }

  if (!('serviceWorker' in navigator)) {
    return Promise.resolve('NOT_SUPPORTED');
  }

  return new Promise((resolve, reject) => {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').then(function(reg) {
        reg.onupdatefound = function() {
          const installingWorker = reg.installing;
    
          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  // At this point, the old content will have been purged and the fresh content will
                  // have been added to the cache.
                  // It's the perfect time to display a "New content is available; please refresh."
                  // message in the page's interface.
                  resolve('UPDATED');
                } else {
                  // At this point, everything has been precached.
                  // It's the perfect time to display a "Content is cached for offline use." message.
                  resolve('NEW');
                }
                break;
    
              case 'redundant':
                resolve('REDUNDANT');
                break;
            }
          };
        };
      }).catch(reject);
    });
  });
}