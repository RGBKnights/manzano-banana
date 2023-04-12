<template>
  <div class="msg-container container mx-auto" >
    <template v-for="(message, i) of messages">
      <ChatMessage :message="message" :index="i"></ChatMessage>
    </template>
    <ChatLoading :loading="isBusy"></ChatLoading>
  </div>
</template>

<script setup>
import { computed, watch, nextTick } from "vue";
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

watch(messages, async (n,o) => {
  try {
    await nextTick();
    document.querySelector('.msg-container:last-child').scrollIntoView(false);
  } catch (error) {
    console.log('error messages', error);
  }
})
</script>

<style scoped >
</style>
