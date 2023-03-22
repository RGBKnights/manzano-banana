<template>
    <div class="message-history">
      <div v-for="(message, index) in messages" :key="index">
        <p>{{ message.content }}</p>
        <p>{{ message.timestamp }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { usePinia } from 'pinia';
  
  export default defineComponent({
    name: 'MessageHistory',
    setup() {
      const { state } = usePinia();
      const messages = state.messages;
  
      return { messages };
    },
  });
  </script>
  
  <style scoped>
  .message-history {
    height: 200px;
    overflow-y: scroll;
  }
  </style>
  