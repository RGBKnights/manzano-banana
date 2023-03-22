<template>
  <div id="app">
    <api-controls />
    <current-chat-viewport />
    <message-history />
    <user-message-text-box />
  </div>
</template>

<script>
import { useStore } from 'pinia';

export default {
  setup() {
    const store = useStore();
    const messages = store.state.messages;

    const connect = async () => {
      // connect to chat GPT API
      // store the connection in the store
    };

    const disconnect = async () => {
      // disconnect from chat GPT API
      // remove the connection from the store
    };

    const sendMessage = async (message) => {
      // send message to chat GPT API
      // add the message to the store
    };

    return {
      messages,
      connect,
      disconnect,
      sendMessage
    };
  }
};
</script>
