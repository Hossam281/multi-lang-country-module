import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faEdit, faTrash, fas } from '@fortawesome/free-solid-svg-icons'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import i18n from './i18n'



/* add icons to the library */
library.add(fas ,faEdit, faTrash)
const app = createApp(App)
const options={
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
}

app.use(createPinia())
app.use(router)
app.component('faIcon', FontAwesomeIcon)
app.use(Toast,options);
app.use(i18n)
app.mount('#app')
