// // src/service-worker.js
// self.addEventListener('push', event => {
//     const options = {
//       body: event.data.text(),
//     };
//     event.waitUntil(
//       self.registration.showNotification('MyApp', options)
//     );
//   });

// // Example: Requesting notification permission
// if (Notification.permission !== 'granted') {
//     Notification.requestPermission().then(permission => {
//       if (permission === 'granted') {
//         console.log('Notification permission granted!');
//       }
//     });
//   }
  
// // Example: Requesting location permission
// if ('geolocation' in navigator) {
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         console.log('User location:', latitude, longitude);
//         // Do something with the location data
//       },
//       error => {
//         console.error('Error getting location:', error);
//       }
//     );
//   }
  
  