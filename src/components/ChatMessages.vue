<template>
  <div class="flex flex-col justify-end py-20 h-screen">
    <div class="overflow-y-scroll">
    <template v-for="(message) of store.messages">
    <div class="bg-transparent p-2">
        <div class="flex border border-gray-500 rounded-lg shadow md:p-4 sm:p-2 bg-white">
          <div class="flex-shrink-0 pr-4">
              <img v-if="message.role == 'assistant'" class="w-8 h-8 rounded-full" src="https://via.placeholder.com/100x100/000000/ffffff?text=Ai" alt="Ai">
              <img v-else-if="message.role == 'user'" class="w-8 h-8 rounded-full" src="https://via.placeholder.com/100x100/f0f0f0/2e2e2e?text=Me" alt="user">
              <img v-else class="w-8 h-8 rounded-full" src="https://via.placeholder.com/100x100/f0f0f0/2e2e2e?text=Me" alt="system">
          </div>
          <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ message.content  }}
              </p>
          </div>
        </div>
    </div>
    </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { messageStore } from '../stores/messageStore.js';

export default defineComponent({
  name: 'Threads',
  setup() {
      const store = messageStore()
      const changeThread = () => {
          store.changeThread(i);
      };
      return { store, changeThread };
  },
});
</script>

<style scoped>
</style>
