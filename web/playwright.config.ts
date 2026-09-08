import {defineConfig} from '@playwright/test';
export default defineConfig({
  testDir:'./tests/browser', fullyParallel:false, workers:1,
  timeout:60000, reporter:'list',
  use:{baseURL:'http://127.0.0.1:3107',channel:'chrome',trace:'retain-on-failure'},
  webServer:{
    command:'npm start',
    url:'http://127.0.0.1:3107/api/health/',
    reuseExistingServer:true,
    timeout:120000,
    env:{SITE_ENV:'preview'},
  },
});
