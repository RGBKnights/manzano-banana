import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPaperPlane, faPlus, faComments, faXmark, faList } from '@fortawesome/free-solid-svg-icons'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import App from './App.vue'

library.add(faPaperPlane)
library.add(faPlus)
library.add(faComments)
library.add(faXmark)
library.add(faList)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

