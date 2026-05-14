import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routers/router.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './assets/css/main.css'
import App from './App.vue'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')