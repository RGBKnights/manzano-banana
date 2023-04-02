<script setup>
import ChatHeader from './components/ChatHeader.vue'
import Menu from './components/Menu.vue'
import ChatInput from './components/ChatInput.vue'
import ChatMessages from './components/ChatMessages.vue'
import Threads from './components/Threads.vue'
</script>

<template>
  <div class="flex h-full w-full">
    <div class="w-60 h-full p-2 bg-gray-900 text-white">
      <div >
        <ChatHeader />
      </div>
      <hr />
      <div class="h-3/4 overflow-y-auto">
        <Threads />
      </div>
      <hr />
      <div>
        <Menu />
      </div>
    </div>
    <div class="h-full w-full flex flex-col bg-slate-100 dark:bg-gray-800">
      <div class="w-full p-4 h-5/6 overflow-y-scroll overflow-x-hidden ">
        <ChatMessages />
      </div>
      <div class="w-full h-1/6 p-4">
        <ChatInput />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

