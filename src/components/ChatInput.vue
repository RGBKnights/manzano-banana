<template>
  <div class="h-full container mx-auto flex">
    <div class="grow">
      <MdEditor v-model="message" language="en-US" noUploadImg :preview="false" :footers="[]" :toolbars="toolbars" :toolbarsExclude="['github', 'catalog', 'htmlPreview', 'fullscreen']">
        <template #defToolbars>
          <NormalToolbar title="upload" @onClick="uploadFileHandle" slot="0">
            <template #trigger>
              <input v-on:change="requestToConvertFile" id="upload-file" type="file" accept=".doc,.docx,.txt" style='display:none;'>
              <font-awesome-icon icon="fa-upload" />
            </template>
          </NormalToolbar >
          <NormalToolbar title="GlobeButton" slot="1">
            <template #trigger>
              <font-awesome-icon icon="fa-globe" />
            </template>
          </NormalToolbar >
        </template>
      </MdEditor>
      <!--<textarea @keydown.enter.exact.prevent="sendMessage"  v-model="message" v-bind:disabled="isBusy" role="5" type="input" id="chat" class="block bg-white w-full border border-slate-300 rounded-md h-24 py-2 pr-3 pl-2 pr-9 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"></textarea>-->
    </div>
    <div class="flex-none pl-5 pt-8">
      <button type="button" @click="sendMessage" v-bind:disabled="isBusy" class="text-yellow-400 text-3xl">
        <font-awesome-icon icon="fa-paper-plane" />
      </button>
      <!-- <div>
        <p>File Upload Bool: {{ monkeyswitch }}</p>
        <button type="button" @click="flipSwitch" v-bind:disabled="isBusy" class="text-red-500 text-3x1">
          <font-awesome-icon icon="fa-upload" />
        </button>
      </div> -->
    </div>
  </div>
  <!-- <div class="flex-none pl-5 pt-8" v-if="monkeyswitch">
    <input type="file" @change="handleFileUpload" v-bind:disabled="monkeySwitch">
  </div> -->
</template>

<script setup>
import { ref, computed  } from 'vue';
import { messageStore } from '../stores/messageStore.js';
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const NormalToolbar = MdEditor.NormalToolbar;

const toolbars = [
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  '-',
  'revoke',
  'next',
  'save',
  '-',
  0,
  1,
  '=',
  'pageFullscreen',
  'preview',
];

const store = messageStore();
const message = ref('');
const sendMessage = async () => {
  const msg = message.value;
  if (!msg) return;
  message.value = ""
  await store.addMessage(msg);
};

const isBusy = computed(() => {
  return store.isBusy
})

const uploadFileHandle = () => {
  const el = document.getElementById('upload-file');
  el.click();
}

const requestToConvertFile = async (evt) => {
  const file = evt.target.files[0];
  console.log(file);
  switch (file.type) {
    case 'text/plain':
    case 'text/markdown':
      {
        const contents = await readFileasText(file);
        console.log(contents);
      }
      break;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      // https://www.npmjs.com/package/word-extractor
      break;
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      break;
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      // https://www.npmjs.com/package/read-excel-file
      break;
    case "application/pdf":
      //https://www.npmjs.com/package/pdf-parse
      break;
    default:
      break;
  }
  
  function readFileasText(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        resolve(reader.result);
      }
      reader.onerror = () => {
        reject(reader.error);
      }
    });
  }
  function readExcelAsTable(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        resolve(reader.result);
      }
      reader.onerror = () => {
        reject(reader.error);
      }
    });
  }
}
</script>

<style scoped>
.md-editor {
  height: 130px;
}
</style>
  