<template>
<div v-if="loading">
  <div class="p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow">
    <div class="flex space-x-4">
      <div class="flex-shrink-0 w-8">
        <img class="w-8 h-8 rounded-md border" src="https://i.imgur.com/eiMpBqJ.png" alt="Ai" />
        </div>
        <div class="flex-1 space-y-2.5 animate-pulse">
        <div class="flex items-center w-full space-x-2 max-w-lg">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[480px]">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[400px]">
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[480px]">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[440px]">
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
        </div>
        <div class="flex items-center w-full space-x-2 max-w-[360px]">
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
defineProps({
  loading: Boolean
})
</script>
