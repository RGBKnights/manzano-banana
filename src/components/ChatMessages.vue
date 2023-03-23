<template>
  <div class="history" v-for="(message) of store.messages" >
    <div class="card">{{ message.content  }}</div>
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
.history {

}



</style>
