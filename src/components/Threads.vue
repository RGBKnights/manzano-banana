<template>
  <div class="flex flex-row py-4 mx-2">
    <div class="flex-none">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-white">Threads</h1>
    </div>
    <div class="flex-auto"></div>
    <div class="flex-none">
      <button @click="store.addThread" type="button"
        class="text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>  
    </div>
  </div>
  <hr class="h-px mx-2 bg-gray-200 border-0 dark:bg-white-500" />
  <div class="mx-2 mt-4">
    <template v-for="t of store.threads">
      <div class="flex">
        <div @click="store.changeThread(t.index)" class="cursor-pointer flex-auto bg-gray-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded text-white">
          {{ t.title }}
        </div>
        <button @click="store.removeThread(t.id)" type="button"
            class="text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>  
      </div>
    </template>
  </div>
</template>

<script setup>
import { messageStore } from "../stores/messageStore.js";
const store = messageStore();
</script>

<style scoped></style>
