<template>
  <div class="px-4 py-2" v-for="(message) of store.messages" >
    <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div class="flow-root ">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                       <img v-if="message.role == 'assistant'" class="w-8 h-8 rounded-full" src="https://via.placeholder.com/100x100/000000/ffffff?text=Ai" alt="Ai">
                       <img v-else-if="message.role == 'user'" class="w-8 h-8 rounded-full" src="https://via.placeholder.com/100x100/f0f0f0/2e2e2e?text=Me" alt="user">
                       <img v-else class="w-8 h-8 rounded-full" src="https://via.placeholder.com/100x100/f0f0f0/2e2e2e?text=Me" alt="system">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {{ message.content  }}
                        </p>
                    </div>
                </div>
            </li>
        </ul>
      </div>
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
