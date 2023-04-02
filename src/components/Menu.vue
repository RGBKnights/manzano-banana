<template>
  <div class="h-10 w-full">
    <button @click="store.addThread" type="button" class="block w-full text-white font-medium rounded text-sm p-2.5 text-center inline-flex items-center mr-2">
      <font-awesome-icon icon="fa-solid fa-plus" /><span class="pl-3">New Thread</span>
    </button> 
  </div>
  <div class="h-10 w-full">
    <button @click="store.clearThreads" type="button" class="block w-full text-white font-medium rounded text-sm p-2.5 text-center inline-flex items-center mr-2">
      <font-awesome-icon icon="fa-solid fa-trash-can" /><span class="pl-3">Clear Threads</span>
    </button> 
  </div>
  <div class="h-10 w-full">
    <button @click="toggleDark()" type="button" class="block w-full text-white font-medium rounded text-sm p-2.5 text-center inline-flex items-center mr-2">
      <font-awesome-icon icon="fa-solid fa-circle-half-stroke" />
      <span v-if="isDark" class="pl-3">Light mode</span>
      <span v-else class="pl-3">Dark mode</span>
    </button> 
  </div>
  <div class="h-10 w-full">
    <button type="button" class="block w-full text-white font-medium rounded text-sm p-2.5 text-center inline-flex items-center mr-2">
      <font-awesome-icon icon="fa-solid fa-user" /><span class="pl-3">My account</span>
    </button> 
  </div>
  
</template>

<script setup>
  import { useDark, useToggle } from '@vueuse/core';
  import { messageStore } from "../stores/messageStore.js";
  const store = messageStore();
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
</script>

<style scoped>
</style>