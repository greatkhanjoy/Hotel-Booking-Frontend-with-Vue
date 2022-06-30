import 'flowbite'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(ConfirmationService)
  .use(ToastService)
  .mount('#app')
