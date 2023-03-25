<template>
  <div v-if="isNotEmpty" class="flex justify-center">
    <div class="relative w-full">
        <input @keyup.enter="sendMessage" v-model="message" type="input" id="chat" class="block w-full p-4  text-sm text-gray-900 border border-gray-500 rounded-lg bg-gray-50 focus:ring-amber-500 focus:border-amber-500 focus:ring-4 focus:outline-none focus:ring-amber-100">
        <button @click="sendMessage" class="text-white absolute right-2.5 bottom-2.5  font-medium rounded-lg text-sm px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-yellow-300 hover:to-yellow-500 ">
          <font-awesome-icon icon="fa-paper-plane" />
        </button>
    </div>
  </div>
</template>
  
  <script>
  import { defineComponent, ref, nextTick  } from 'vue';
  import { mapState } from 'pinia'
  import { messageStore } from '../stores/messageStore.js';
  
  export default defineComponent({
    name: 'UserMessageTextBox',
    setup() {
      const store = messageStore()
      const message = ref('');
      const sendMessage = () => {
        store.addMessage(message.value);
        message.value = "";
        nextTick(() => {
          document.scrollIntoView({behavior: "smooth"});
        })
      };
  
      return { message, sendMessage };
    },
    computed: {
    ...mapState(messageStore, ['isNotEmpty']),
  },
  });
  </script>
  
  <style scoped>

  </style>
  