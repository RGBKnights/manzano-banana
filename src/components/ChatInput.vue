<template>
  <div class="h-full w-full">
    <label class="relative block">
      <span class="sr-only">Chat</span>
      <span @click="sendMessage" class="absolute inset-y-0 right-0 flex items-center pr-2">
        <font-awesome-icon icon="fa-paper-plane" />
      </span>
      <input @keyup.enter="sendMessage" v-model="message" type="input" id="chat" class="block bg-white w-full border border-slate-300 rounded-md py-2 pr-3 pl-2 pr-9 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm">
    </label>
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
  