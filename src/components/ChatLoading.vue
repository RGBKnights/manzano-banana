<template>
<div v-if="loading" class="p-2">
  <div class="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600">
    <div class="flex space-x-4">
      <div class="flex-shrink-0 w-8">
        <img class="w-8 h-8 rounded-md border" src="https://i.imgur.com/eiMpBqJ.png" alt="Ai" />
        </div>
        <div class="flex-1 space-y-2.5 animate-pulse">
          <div class="fade-in fade-in-1 flex items-center w-full space-x-2 ">
            <div class="h-2.5 bg-gray-200 rounded-full w-32"></div>
            <div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
            <div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
          </div>
          <div class="fade-in fade-in-2 flex items-center w-full space-x-2 ">
            <div class="h-2.5 bg-gray-200 rounded-full w-full"></div>
            <div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
            <div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
          </div>
          <div class="fade-in fade-in-3 flex items-center w-full space-x-2">
            <div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
            <div class="h-2.5 bg-gray-200 rounded-full w-80"></div>
            <div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
          </div>
          <div class="fade-in fade-in-4 flex items-center w-full space-x-2 ">
            <div class="h-2.5 bg-gray-200 rounded-full w-full"></div>
            <div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
            <div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
          </div>
          <div class="fade-in fade-in-5 flex items-center w-full space-x-2">
            <div class="h-2.5 bg-gray-300 rounded-full w-32"></div>
            <div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
            <div class="h-2.5 bg-gray-200 rounded-full w-full"></div>
          </div>
          <div class="fade-in fade-in-6 flex items-center w-full space-x-2 ">
            <div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
            <div class="h-2.5 bg-gray-200 rounded-full w-80"></div>
            <div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
          </div>
          <div class="fade-in fade-in-7 flex items-center w-full space-x-2">
            <div class="h-2.5 bg-gray-200 rounded-full w-full"></div>
            <div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
            <div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
          </div>
          <div class="fade-in fade-in-8 flex items-center w-full space-x-2 ">
            <div class="h-2.5 bg-gray-200 rounded-full w-32"></div>
            <div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
            <div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
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

<style scoped>
.fade-in {
  opacity:0;
  animation-fill-mode: forwards;
  animation-name: fadeInFromNone;
}
.fade-in-1 {
  animation-duration: 10s;
}
.fade-in-2 {
  animation-duration: 20s;
  animation-delay: 10s;
}
.fade-in-3 {
  animation-duration: 30s;
  animation-delay: 20s;
}
.fade-in-4 {
  animation-duration: 40s;
  animation-delay: 35s;
}
.fade-in-5 {
  animation-duration: 50s;
  animation-delay: 40s;
}
.fade-in-6 {
  animation-duration: 60s;
  animation-delay: 50s;
}
.fade-in-7 {
  animation-duration: 90s;
  animation-delay: 60s;
}
.fade-in-8 {
  animation-duration: 120s;
  animation-delay: 90s;
}


@keyframes fadeInFromNone {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

</style>