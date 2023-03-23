<template>
    <input type="text" @keyup.enter="sendMessage" v-model="message" />
    <button type="button" @click="sendMessage">Add</button>
</template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { messageStore } from '../stores/messageStore.js';
  
  export default defineComponent({
    name: 'UserMessageTextBox',
    setup() {
      const store = messageStore()
      const message = ref('');
      const sendMessage = () => {
        store.addMessage(message.value);
        message.value = "";
      };
  
      return { message, sendMessage };
    },
  });
  </script>
  
  <style scoped>

  </style>
  