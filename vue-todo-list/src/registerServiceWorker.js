/* eslint-disable no-console */

import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      );
      // Check if the app is already installed
      if (navigator.serviceWorker.controller) {
        console.log('App is already installed.');
      } else {
        // Show the install button
        showInstallButton();
      }
    },
    registered(registration) {
      console.log('Service worker has been registered.', registration);
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated(registration) {
      console.log('New content is available; please refresh.');
      // Show a notification or update UI to prompt the user to refresh
      showUpdateNotification();
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}

export default {
  // ... other component options ...

  mounted() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        // Check if the app is already installed
        if (registration.navigationPreload.state === 'enabled') {
          console.log('App is already installed.');
        } else {
          // Show the install button
          this.showInstallButton();
        }
      });
    }
  },

  methods: {
    async showInstallButton() {
      const result = await window.confirm('Install the app?');
      if (result) {
        // Trigger installation
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration && registration.navigationPreload) {
          await registration.navigationPreload.enable();
        }
      }
    },

    async requestNotificationPermission() {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          // Handle notification access granted
          console.log('Notification access granted!');
        }
      }
    },

    async showNotification() {
      if ('serviceWorker' in navigator && 'Notification' in window) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          registration.showNotification('New Content Available', {
            body: 'Click to view the latest content.',
            icon: '/img/notification-icon.png', // Add your notification icon path
          });
        }
      }
    },
  },
};