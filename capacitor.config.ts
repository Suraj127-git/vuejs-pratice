import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.testing',
  appName: 'testing',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
