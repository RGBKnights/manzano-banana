<template>
 <div class="p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow">
  <div class="flex space-x-4">
    <div class="flex-shrink-0 w-8" @click="onChange">
      <img v-if="message.role == 'system'" class="w-8 h-8 rounded-md border" src="https://i.imgur.com/eiMpBqJ.png" alt="Ai" />
      <img v-if="message.role == 'assistant'" class="w-8 h-8 rounded-md border" src="https://i.imgur.com/eiMpBqJ.png" alt="Ai" />
      <img v-if="message.role == 'user'" class="w-8 h-8 rounded-md border" src="https://via.placeholder.com/100x100/ffffff/000000?text=Me" alt="Me" />
    </div>
    <div class="flex-1 min-w-0">
      <MdEditor v-if="preview" v-model="message.content" :previewOnly="true" :autoDetectCode="true" language="en-US"/>
      <MdEditor v-if="!preview" v-model="message.content" language="en-US" :autoDetectCode="true" :toolbarsExclude="['github', 'catalog', 'htmlPreview', 'fullscreen']" />
    </div>
  </div>
 </div>
</template>

<script setup>
import { ref } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const props = defineProps(['message'])
const preview = ref(true);
function onChange() {
  preview.value = !preview.value;
}
</script>

<style>
</style>
