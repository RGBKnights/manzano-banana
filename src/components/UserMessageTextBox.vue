<template>
    <div class="user-message-text-box">
      <input type="text" v-model="message" @keyup.enter="sendMessage" />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { usePinia } from 'pinia';
  
  export default defineComponent({
    name: 'UserMessageTextBox',
    setup() {
      const { actions } = usePinia();
      const message = ref('');
  
      const sendMessage = () => {
        actions.sendMessage(message.value);
        message.value = '';
      };
  
      return { message, sendMessage };
    },
  });
  </script>
  
  <style scoped>
  .user-message-text-box {
    margin-top: 20px;
  }
  </style>
  