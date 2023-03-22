<template>
    <div class="current-chat-viewport">
      <MessageHistory />
    </div>
    
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import MessageHistory from './MessageHistory.vue';
  
  export default defineComponent({
    name: 'CurrentChatViewport',
    components: {
      MessageHistory,
    },
  });
  </script>
  
  <style scoped>
  .current-chat-viewport {
    height: 400px;
    border: 1px solid black;
  }
  </style>
  