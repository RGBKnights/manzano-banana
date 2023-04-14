<script setup>
import ChatHeader from './ChatHeader.vue'
import Menu from './Menu.vue'
import Threads from './Threads.vue'
</script>

<template>
  <div class="h-full p-2">
    <div class="h-1/4">
      <ChatHeader />
      <Menu />
    </div>
    <div class=" h-3/4 overflow-y-auto">
      <Threads />
    </div>
  </div>
</template>