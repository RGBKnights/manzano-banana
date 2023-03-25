<script setup>
import ChatInput from './components/ChatInput.vue'
import ChatMessages from './components/ChatMessages.vue'
import Threads from './components/Threads.vue'
</script>

<template>
  <div class="content font-sans leading-normal tracking-normal h-screen">
    <Threads/>
    <div class="fixed top-0 left-0 z-10 w-full h-16 bg-white border-gray-200">
      <h1 class="text-5xl text-center font-extrabold text-gray-900"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-amber-400">Manzano</span> Banana</h1>
    </div>
    <div class="">
      <ChatMessages/> 
    </div>
    <div class="fixed bottom-0 left-0 z-10 w-full h-20 p-2 bg-transparent border-gray-200">
      <ChatInput/>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lobster');
h1 {
  font-family: 'Lobster', sans-serif;
}

.content::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  
  display: block;
  background-image: url('https://i.imgur.com/ymaQMmZ.png');
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;

  filter: blur(4px);
}
</style>

