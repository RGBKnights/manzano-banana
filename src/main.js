import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPaperPlane, faPlus, faComments, faXmark, faList, faPen, faFileImport, faGlasses, faUser, faTrashCan, faCircleHalfStroke, faMicrophone, faCircle, faCircleStop, faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
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
library.add(faMicrophone);
library.add(faCircle);
library.add(faCircleStop);
library.add(faMarkdown);
library.add(faCirclePlay);

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

