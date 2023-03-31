<template>
  <div class="h-full container mx-auto flex">
    <div class="grow">
      <MdEditor v-model="message" language="en-US" :preview="false" :footers="[]"  :toolbarsExclude="['github', 'catalog', 'htmlPreview', 'fullscreen']" />
      <!--<textarea @keydown.enter.exact.prevent="sendMessage"  v-model="message" v-bind:disabled="isBusy" role="5" type="input" id="chat" class="block bg-white w-full border border-slate-300 rounded-md h-24 py-2 pr-3 pl-2 pr-9 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"></textarea>-->
    </div>
    <div class="flex-none pl-5 pt-8">
      <button type="button" @click="sendMessage"  v-bind:disabled="isBusy" class="text-yellow-400 text-3xl">
        <font-awesome-icon icon="fa-paper-plane" />
      </button>
    </div>
    
  </div>
</template>

<script>
  import { defineComponent, ref  } from 'vue';
  import { mapState } from 'pinia'
  import { messageStore } from '../stores/messageStore.js';
  import MdEditor from "md-editor-v3";
  import "md-editor-v3/lib/style.css";

  export default defineComponent({
    name: 'ChatInput',
    setup() {
      const store = messageStore()
      const message = ref('');
      const sendMessage = async () => {
        const msg = message.value;
        if(!msg) return;
        message.value = ""
        await store.addMessage(msg);
      };
  
      return { message, sendMessage };
    },
    components: {
      MdEditor,
    },
    computed: {
      ...mapState(messageStore, ['isBusy']),
      ...mapState(messageStore, ['isNotEmpty']),
    },
  });
  </script>
  
  <style scoped>
  .md-editor {
    height: 130px;
  }
  </style>
  