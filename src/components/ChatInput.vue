<template>
  <div class="flex justify-center px-4 py-2">
    <div class="relative w-full">
        <input @keyup.enter="sendMessage" v-model="message" type="input" id="chat" class="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <button @click="sendMessage" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <font-awesome-icon icon="fa-paper-plane" />
        </button>
    </div>
  </div>
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
  