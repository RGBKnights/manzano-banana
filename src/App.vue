<script setup>
import ChatInput from './components/ChatInput.vue'
import ChatMessages from './components/ChatMessages.vue'
import Threads from './components/Threads.vue'
</script>

<template>
  <div class="layout">
    <div>
      <Threads/>
    </div>
    <div class="history">
      <div>
        <ChatMessages/>
      </div>
      <div>
        <ChatInput/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
}

.history {
  display: flex;
  flex-direction: column;
}
</style>
