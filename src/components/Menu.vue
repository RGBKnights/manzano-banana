<template>
  <div class="h-10 w-full">
    <button @click="store.addThread" type="button" class="block w-full font-medium rounded text-sm p-2.5 text-center inline-flex items-center mr-2">
      <font-awesome-icon icon="fa-solid fa-plus" /><span class="pl-3">New Thread</span>
    </button> 
  </div>
  <div class="h-10 w-full">
    <button @click="clearThreads" type="button" class="block w-full font-medium rounded text-sm p-2.5 text-center inline-flex items-center mr-2">
      <font-awesome-icon icon="fa-solid fa-trash-can" /><span class="pl-3">Clear Threads</span>
    </button> 
  </div>
  <div class="h-10 w-full">
    <button @click="toggleDark()" type="button" class="block w-full font-medium rounded text-sm p-2.5 text-center inline-flex items-center mr-2">
      <font-awesome-icon icon="fa-solid fa-circle-half-stroke" />
      <span v-if="isDark" class="pl-3">Light mode</span>
      <span v-else class="pl-3">Dark mode</span>
    </button> 
  </div>
  <div class="h-10 w-full">
    <button @click="account" type="button" class="block w-full  font-medium rounded text-sm p-2.5 text-center inline-flex items-center mr-2">
      <font-awesome-icon icon="fa-solid fa-user" /><span class="pl-3">My account</span>
    </button> 
  </div>
  
</template>

<script setup>
  import { computed } from "vue";
  import { useDark, useToggle } from '@vueuse/core';
  import { messageStore } from "../stores/messageStore.js";
  const store = messageStore();
  const user = computed(() => {
    return store.user
  })
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  function clearThreads() {
    if(confirm("Clear Threads?")) {
      store.clearThreads();
    }
  } 
  function account() {
    alert(`User: ${user.value}`);
  } 
</script>

<style scoped>
</style>