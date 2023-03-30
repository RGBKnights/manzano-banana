<template>
  <template v-for="(message) of store.messages">
    <div class="p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow">
      <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
            <img v-if="message.role == 'system'" class="w-8 h-8 rounded-full border" src="https://via.placeholder.com/100x100/000000/ffffff?text=Ai" alt="Ai">
            <img v-if="message.role == 'assistant'" class="w-8 h-8 rounded-full border" src="https://via.placeholder.com/100x100/000000/ffffff?text=Ai" alt="Ai">
            <img v-if="message.role == 'user'" class="w-8 h-8 rounded-full border" src="https://via.placeholder.com/100x100/ffffff/000000?text=Me" alt="Me">
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-500 truncate">
              {{message.content}}
            </p>
          </div>
        </div>
    </div>
  </template>
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

