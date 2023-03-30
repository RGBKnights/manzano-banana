<script setup>
import ChatHeader from './components/ChatHeader.vue'
import ChatUser from './components/ChatUser.vue'
import ChatInput from './components/ChatInput.vue'
import ChatMessages from './components/ChatMessages.vue'
import Threads from './components/Threads.vue'
</script>

<template>
  <div class="flex h-full w-full">
    <div class="w-60 h-full p-2 bg-slate-700 text-white">
      <div >
        <ChatHeader />
      </div>
      <div class="h-4/5 overflow-y-auto">
        <Threads/>
      </div>
      <div>
        <ChatUser/>
      </div>
    </div>
    <div class="h-full w-full flex flex-col  bg-slate-100">
      <div class="flex-grow w-full p-4 overflow-auto">
        <ChatMessages/> 
      </div>
      <div class="h-16 w-full p-4">
        <ChatInput/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

