<template>
 <div>
    <div class="pb-4">
      <span class="font-bold italic text-2xl underlined underline-clip">Manzano</span><span class="text-white font-bold "> Banana</span>
    </div>
    <div>
      <button @click="store.addThread" type="button" class="mt-2 mb-2 block w-full text-white font-medium rounded text-sm p-2.5 text-center inline-flex items-center mr-2 border border-white rounded-l-lg ">
        <font-awesome-icon icon="fa-solid fa-plus" /><span class="pl-3">New Chat</span>
      </button> 
    </div>
 </div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { initFlowbite } from 'flowbite'
  import { messageStore } from "../stores/messageStore.js";
  const store = messageStore();
  onMounted(() => {
    initFlowbite();
  })
</script>

<style scoped>
.underlined {
/*   background: red; */
  position: relative;
}

.underline-overflow {
  display: inline-block;
  /* A little extra padding and overflow hidden   */
  overflow: hidden;
  padding-bottom: clamp(1rem, 2vmin, 2rem);
}

.underline-clip:after {
  content: '';
  position: absolute;
  top: 95%;
  width: 150%;
  aspect-ratio: 3 / 1;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 50%;
  border: 6px solid hsl(51, 84%, 45%);
  /* Use a clip-path to hide and show the bits you want */
  clip-path: polygon(0 0, 50% 50%, 100% 0);
}
</style>