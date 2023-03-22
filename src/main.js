import { createApp, defineComponent } from 'vue';
import './style.css';
import axios from 'axios';
import { store } from './stores/storeTest.js';
import { createChatAPI } from 'openai';
import MessageHistory from './components/MessageHistory.vue';
import ChatViewport from './components/CurrentChatViewport.vue';
import UserMessageBox from './components/UserMessageTextBox.vue';
import ApiControls from './components/ApiControls.vue';

const App = defineComponent({
  components: {
    MessageHistory,
    ChatViewport,
    UserMessageBox,
    ApiControls,
  },
  setup() {
    return {};
  },
});

const app = createApp(App);

app.component('MessageHistory', MessageHistory);
app.component('ChatViewport', ChatViewport);
app.component('UserMessageBox', UserMessageBox);
app.component('ApiControls', ApiControls);

app.use(store);

app.mount('#app');
