<template>
  <div id="msg-header"></div>
  <div class="msg-container">
    <template v-for="(message, i) of messages">
      <ChatMessage :message="message" :index="i"></ChatMessage>
    </template>
    <ChatLoading :loading="isBusy"></ChatLoading>
  </div>
  <div id="msg-footer"></div>
</template>

<script setup>
import { computed, watch } from "vue";
import { messageStore } from "../stores/messageStore.js";
import ChatMessage from "./ChatMessage.vue"
import ChatLoading from "./ChatLoading.vue"

const store = messageStore();

const messages = computed(() => {
  return store.messages
})

const isBusy = computed(() => {
  return store.isBusy
})

watch(isBusy, async (n,o) => {
  setTimeout(async() => {
    document.querySelector('#msg-footer').scrollIntoView();
  }, 100);
})
</script>

<style scoped >
</style>
