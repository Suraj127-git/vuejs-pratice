import './assets/main.css'; // Import the CSS file

import { createApp } from 'vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import App from './App.vue';

const app = createApp(App); // Create the Vue app instance

// Register PrimeVue components selectively based on usage:
app.use(DataTable, Column);

app.mount('#app'); // Mount the app to the DOM element with ID 'app'
