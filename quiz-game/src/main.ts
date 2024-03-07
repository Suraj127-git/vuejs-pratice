import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp(App);

app.use(VueAxios, axios);

app.mount('#app');

// Request location permission when the application loads
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      console.log('User location:', latitude, longitude);
      // Do something with the location data

      // Now, trigger the notification permission request
      requestNotificationPermission();
    },
    (error: GeolocationPositionError) => {
      console.error('Error getting location:', error);

      // In case of geolocation error, still attempt to request notification permission
      requestNotificationPermission();
    }
  );
} else {
  console.error('Geolocation is not supported in this browser.');
}

function requestNotificationPermission() {
  // Request notification permission when the application loads
  if ('Notification' in window) {
    console.log(Notification.permission);
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission: NotificationPermission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted!');
        } else if (permission === 'denied') {
          console.log('Notification permission denied.');
        } else if (permission === 'default') {
          console.log('Notification permission dismissed or not yet requested.');
        }
      });
    } else {
      console.log('Notification permission already granted.');
    }
  } else {
    console.error('Notifications not supported in this browser.');
  }
}
