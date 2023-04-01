import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPaperPlane, faPlus, faComments, faXmark, faList, faPen, faFileImport, faGlasses, faUser, faTrashCan, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

import './style.css'
import "md-editor-v3/lib/style.css";

library.add(faPaperPlane)
library.add(faPlus)
library.add(faComments)
library.add(faXmark)
library.add(faList)
library.add(faPen)
library.add(faFileImport)
library.add(faGlasses)
library.add(faTrashCan);
library.add(faCircleHalfStroke);
library.add(faUser);

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

