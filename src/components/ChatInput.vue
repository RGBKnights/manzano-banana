<template>
  <div class="h-full w-full">
    <label class="relative block">
      <span class="sr-only">Chat</span>
      <button type="button" @click="sendMessage"  v-bind:disabled="isBusy" class="absolute inset-y-0 right-0 flex items-center pr-2 text-yellow-400">
        <font-awesome-icon icon="fa-paper-plane" />
      </button>
      <input @keyup.enter="sendMessage" v-model="message" v-bind:disabled="isBusy" type="input" id="chat" class="block bg-white w-full border border-slate-300 rounded-md py-2 pr-3 pl-2 pr-9 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm">
    </label>
  </div>
</template>

<script>
  import { defineComponent, ref  } from 'vue';
  import { mapState } from 'pinia'
  import { messageStore } from '../stores/messageStore.js';
  
  export default defineComponent({
    name: 'ChatInput',
    setup() {
      const store = messageStore()
      const message = ref('');
      const sendMessage = async () => {
        const msg = message.value;
        if(!msg) return;
        message.value = ""
        await store.addMessage(msg);
      };
  
      return { message, sendMessage };
    },
    computed: {
      ...mapState(messageStore, ['isBusy']),
      ...mapState(messageStore, ['isNotEmpty']),
    },
  });
  </script>
  
  <style scoped>

  </style>
  