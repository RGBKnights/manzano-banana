<script setup>
import ChatInput from './components/ChatInput.vue'
import ChatMessages from './components/ChatMessages.vue'
import Threads from './components/Threads.vue'
</script>

<template>
  <div class="h-screen w-screen font-sans leading-normal tracking-normal flex ">
    <div class="h-screen w-1/6 bg-gradient-to-r from-amber-500 to-amber-300">
      <Threads/>
    </div>
    <div class="flex flex-col justify-end h-screen w-full bg-no-repeat bg-center bg-gradient-to-r from-amber-300 to-violet-800">
      <div>
        <div class="overflow-y-auto">
          <ChatMessages/>
        </div>
        <div>
          <ChatInput/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

