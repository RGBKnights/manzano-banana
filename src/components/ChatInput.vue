<template>
  <div class="h-full container mx-auto flex">
    <div v-if="editor == 0" class="grow flex">
      <div class="flex flex-col justify-center pr-2 w-12">
        <button title="Whisper" type="button" @click="changeEditor" v-bind:disabled="isBusy" class="text-sky-400  text-3xl pr-2">
          
          <font-awesome-icon icon="fa-brands fa-markdown" />
        </button>
      </div>
      <textarea  @keydown.enter.exact.prevent="addMessage"  v-model="message" v-bind:disabled="isBusy"  type="input" id="chat" class="h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
      <div class="flex-none w-12 flex flex-col justify-center">
        <button title="Send Messages" type="button" @click="sendMessages" v-bind:disabled="isBusy" class="text-amber-500 text-3xl">
          <font-awesome-icon icon="fa-paper-plane" />
        </button>
      </div>
      
    </div>
    <div v-if="editor == 1" class="grow flex">
      <div class="flex flex-col justify-center pr-2 w-12">
        <button title="Change Editors" type="button" @click="changeEditor" v-bind:disabled="isBusy" class="text-sky-400 text-3xl">
          <font-awesome-icon icon="fa-solid fa-microphone" />
        </button>
      </div>
      <MdEditor  v-model="message" language="en-US" noUploadImg :theme="isDark ? 'dark' : 'light'" :preview="false" :footers="[]" :toolbars="toolbars" :toolbarsExclude="['github', 'catalog', 'htmlPreview', 'fullscreen']">
        <template #defToolbars>
          <NormalToolbar title="upload file" @onClick="uploadFileHandle" slot="0">
            <template #trigger>
              <input v-on:change="requestToConvertFile" id="upload-file" type="file" accept=".doc,.docx,.txt" style="display:none;">
              <font-awesome-icon icon="fa-solid fa-file-import" />
            </template>
          </NormalToolbar>
          <NormalToolbar title="read link " slot="1">
            <template #trigger>
              <font-awesome-icon icon="fa-solid fa-glasses" />
            </template>
          </NormalToolbar>
        </template>
      </MdEditor>
      <div class="flex-none w-12 flex flex-col justify-center">
        <button title="Send Messages" type="button" @click="sendMessages" v-bind:disabled="isBusy" class="text-amber-500 text-3xl">
          <font-awesome-icon icon="fa-paper-plane" />
        </button>
      </div>
    </div>
    <div v-if="editor == 2" class="grow flex">
      <div class="flex flex-col justify-center pr-2 w-12">
        <button title="Change Editors" type="button" @click="changeEditor" v-bind:disabled="isBusy" class="text-sky-400 text-3xl">
          <font-awesome-icon icon="fa-solid fa-pen" />
        </button>
      </div>
      <div class="w-full h-full flex justify-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <button v-if="recording"  title="Whisper" type="button" v-bind:disabled="isBusy" class="text-slate-300 text-3xl pr-2">
          <font-awesome-icon icon="fa-solid fa-circle-stop" />
        </button>
        <button v-else itle="Whisper" type="button" v-bind:disabled="isBusy" class="text-red-400 text-3xl pr-2">
          <font-awesome-icon icon="fa-solid fa-circle" />
        </button>
      </div>
      <div class="flex-none w-12 flex flex-col justify-center">
        <button title="Send Messages" type="button" @click="sendMessages" v-bind:disabled="isBusy" class="text-amber-500 text-3xl">
          <font-awesome-icon icon="fa-paper-plane" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDark } from '@vueuse/core';
import { ref, computed  } from 'vue';
import { messageStore } from '../stores/messageStore.js';
import MdEditor from "md-editor-v3";

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
  'table',
  'mermaid',
  'katex',
  'image',
  0,
  1,
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'pageFullscreen',
  'preview',
];

const isDark = useDark();
const store = messageStore();
const message = ref('');
const recording = ref(false);
const editor = ref(0);

const addMessage = () => {
  const msg = message.value;
  if (!msg) return;
  message.value = ""
  store.addMessage(msg);
};

const changeEditor = async () => {
  switch (editor.value) {
    case 0:
      editor.value = 1;
      break;
    case 1:
      editor.value = 2;
      break;
    case 2:
      editor.value = 0
      break;
    default:
      break;
  }
};

const sendMessages = async () => {
  addMessage();
  await store.sendMessages();
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
.md-editor-dark  {
  --md-bk-color: rgb(55,65,81);
}
.md-editor {
  height: 100%;
  border-radius: 0.5rem;
}
</style>
  