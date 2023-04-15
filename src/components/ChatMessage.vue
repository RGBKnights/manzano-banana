<template>
  <div class="msg-card p-2">
    <div class="p-4 bg-white border border-gray-200 rounded-lg shadow relative dark:bg-gray-700 dark:border-gray-600">
      <div class="flex space-x-4 scrollable">
        <div class="flex-shrink-0 w-8">
          <img v-if="message.role === 'system'" class="w-8 h-8 rounded-md border dark:border-gray-600" src="https://i.imgur.com/eiMpBqJ.png" alt="System" />
          <img v-if="message.role === 'assistant'" @click="changeRole" class="w-8 h-8 rounded-md border dark:border-gray-600" src="https://via.placeholder.com/100x100/ffffff/000000?text=Ai" alt="Ai" />
          <img v-if="message.role === 'user'" @click="changeRole" class="w-8 h-8 rounded-md border dark:border-gray-600" src="https://via.placeholder.com/100x100/000000/ffffff?text=Me" alt="Me" />
        </div>
        <div class="flex-1 min-w-0 pr-5" >
          <MdEditor v-if="preview" v-model="message.content" :previewOnly="true" :autoDetectCode="true" language="en-US" codeTheme="github" previewTheme="github" :theme="isDark ? 'dark' : 'light'" />
          <MdEditor v-if="!preview" v-model="message.content" language="en-US" :autoDetectCode="true" codeTheme="github" previewTheme="github" :theme="isDark ? 'dark' : 'light'" :toolbarsExclude="['github', 'catalog', 'htmlPreview', 'fullscreen']" />
        </div>
      </div>
      <!-- rounded-md border-black border-solid border-2 border-slate-500  -->
      <div @click="editMessage" class="commands absolute h-6 w-6 top-1 right-1 opacity-20 invisible flex justify-center">
        <font-awesome-icon icon="fa-solid fa-pen " />
      </div>
      <div @click="store.deleteMessage(index)" class="commands absolute h-6 w-6 top-7 right-1 opacity-20 invisible flex justify-center">
        <font-awesome-icon icon="fa-solid fa-xmark " />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDark } from '@vueuse/core';
import { messageStore } from '../stores/messageStore.js';
import MdEditor from "md-editor-v3";
import { nanoid } from 'nanoid'


const store = messageStore();

const isDark = useDark();
const props = defineProps(['message', 'index']);
const preview = ref(true);

const editMessage = () => {
  preview.value= !preview.value;
}

const changeRole = () => {
  if(preview.value === false) {
    store.changeRole(props.index + 1);
  }
}

MdEditor.config({
   markedRenderer(renderer) {
     const originalCodeRenderer = renderer.code;
     renderer.code = function(code, language, isEscaped) {
       const result = originalCodeRenderer.call(this, code, language, isEscaped);
       if(language == 'chartjs') {
        const url = `https://quickchart.io/chart?c=${encodeURIComponent(code)}`
        return `<img src="${url}" title="" alt="Chart" zoom="" class="medium-zoom-image">`
       } else if(language == 'katex') { 
        const id = nanoid(10);
        setTimeout(() => {
          const elt = document.getElementById(`calculator-${id}`)
          var calculator = Desmos.GraphingCalculator(elt);
          calculator.setExpression({ id: `calculator-${id}`, latex: 'y=mx+b' });
        }, 500);
        return `<div id="calculator-${id}" style="width: 900px; height: 600px;"></div>`;
       } else if(language == 'musicxml') { 
        const id = nanoid(10);
        setTimeout(async () => {
          const elt = document.getElementById(`osmdContainer-${id}`)
          var osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(elt);
          osmd.setOptions({
            backend: "svg",
            drawTitle: true,
            darkMode: isDark.value
          });
          await osmd.load(code)
          await osmd.render()
        }, 500);
        return `<div id="osmdContainer-${id}"></div>`;
       }
      return result;
     };
     return renderer;
  }
});

</script>

<style scoped>
.md-editor-dark  {
  --md-bk-color: rgb(55,65,81);
}
.msg-card:hover .commands {
  visibility: visible;
}
</style>
