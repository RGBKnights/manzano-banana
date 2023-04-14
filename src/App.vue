<script setup>
import SideBar from './components/SideBar.vue'
import ChatInput from './components/ChatInput.vue'
import ChatMessages from './components/ChatMessages.vue'
</script>

<template>
  <div class="w-72 h-full absolute bg-slate-300 z-20 text-slate-700 dark:bg-slate-500 dark:text-slate-300">
    <SideBar />
  </div>
  <div class="pl-72 w-full h-full absolute bg-slate-100 dark:bg-slate-600">
    <div class="w-full h-full overflow-y-scroll pb-44">
      <div class="container mx-auto">
        <ChatMessages />
      </div>
    </div>
    <div class="absolute pl-72 w-full h-44 left-0 bottom-0 bg-gradient-to-t via-slate-300 from-slate-300 dark:via-slate-500 dark:from-slate-500">
      <div class="w-full h-full p-2 pt-10">
        <ChatInput />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

