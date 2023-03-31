<template>
  <div class="container mx-auto">
    <template v-for="message of store.messages">
      <div class="p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow">
        <div class="flex space-x-4">
          <div class="flex-shrink-0 w-8">
            <img v-if="message.role == 'system'" class="w-8 h-8 rounded-md border" src="https://i.imgur.com/eiMpBqJ.png" alt="Ai" />
            <img v-if="message.role == 'assistant'" class="w-8 h-8 rounded-md border" src="https://i.imgur.com/eiMpBqJ.png" alt="Ai" />
            <img v-if="message.role == 'user'" class="w-8 h-8 rounded-md border" src="https://via.placeholder.com/100x100/ffffff/000000?text=Me" alt="Me" />
          </div>
          <div class="flex-1 min-w-0">
            <MdEditor v-model="message.content" previewOnly />
          </div>
        </div>
      </div>
    </template>
    <div v-if="isBusy" class="p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow">
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

<script>
import { defineComponent } from "vue";
import { messageStore } from "../stores/messageStore.js";
import { mapState } from "pinia";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

export default defineComponent({
  name: "ChatMessages",
  setup() {
    const store = messageStore();
    const changeThread = () => {
      store.changeThread(i);
    };
    return { store, changeThread };
  },
  updated() {
    this.$nextTick(() => this.scrollToEnd());
  },
  computed: {
    ...mapState(messageStore, ["isBusy"]),
  },
  components: {
    MdEditor,
  },
  methods: {
    scrollToEnd: function () {
      console.log("scroll");
      window.scrollTo(
        {
          top: document.body.scrollHeight,
          left: 0,
          behavior: "smooth"
        }
      );
    },
  },
});
</script>

<style lang="postcss">
a {
  @apply font-medium text-blue-600 dark:text-blue-500 hover:underline;
}
p {
  @apply pb-1;
  word-break: break-word;
}
</style>
