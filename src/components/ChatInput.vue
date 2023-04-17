<template>
  <div class="h-full container mx-auto flex">
    <div v-if="editor == 0" class="grow flex">
      <div class="flex flex-col justify-center pr-2 w-12">
        <button title="Whisper" type="button" @click="changeEditor" v-bind:disabled="isBusy" class="text-sky-400  text-3xl pr-2">
          
          <font-awesome-icon icon="fa-brands fa-markdown" />
        </button>
      </div>
      <textarea  @keydown.enter.exact.prevent="sendMessages"  v-model="message" v-bind:disabled="isBusy"  type="input" id="chat" class="h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
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
          <NormalToolbar title="upload document" @onClick="uploadFileHandle" slot="0">
            <template #trigger>
              <input v-on:change="requestToConvertFile" id="upload-file" type="file" accept="text/plain,text/markdown,text/csv,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet," style="display:none;">
              <font-awesome-icon icon="fa-solid fa-file-import" />
            </template>
          </NormalToolbar>
          <NormalToolbar title="read webpage" @onClick="readWebPage" slot="1">
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
        <ChatRecorder :isBusy="isBusy"></ChatRecorder>
      </div>
      <div class="flex-none w-12 flex flex-col justify-center">
        <button title="Send Messages" type="button" @click="sendMessages" v-bind:disabled="isBusy" class="text-amber-500 text-3xl">
          <font-awesome-icon icon="fa-paper-plane" />
        </button>
      </div>
    </div>
  </div>
</template>

<!-- TODO: File upload Excel, Word, Txt, markdown, PDF -->

<script setup>
import { useDark } from '@vueuse/core';
import { ref, computed  } from 'vue';
import { messageStore } from '../stores/messageStore.js';
import { fetchApi } from "../apis/chat"
import ChatRecorder from "./ChatRecorder.vue"
import MdEditor from "md-editor-v3";
import mammoth from "mammoth/mammoth.browser";
import csvToMarkdown from "csv-to-markdown-table";
import readXlsxFile from 'read-excel-file'
import tablemark from "tablemark"

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

const user = computed(() => {
  return store.user
})

const readWebPage = async () => {
  try {
    const url = prompt("Please enter a url")
    if(url) {
      const data = {
        user: user.value, 
        url: url
        // configuration: {}
      }
      const response = await fetchApi.post(`/fetch`, data)
      message.value = response.data
    }
  } catch (error) {
    console.log('readWebPage', error);
  }
}

const uploadFileHandle = () => {
  const el = document.getElementById('upload-file');
  el.click();
}

const requestToConvertFile = async (evt) => {
  try {
    const file = evt.target.files[0];
    switch (file.type) {
      case 'text/plain':
        {
          message.value = await readAsText(file)
          break
        }
      case 'text/markdown':
        {
          message.value = await readAsText(file)
          break
        }
      case "text/csv":
        {
          const csv = await readAsText(file)
          message.value = csvToMarkdown(csv, ",", true)
          break
        }
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        {
          const buffer = await readAsArrayBuffer(file)
          const result = await mammoth.convertToMarkdown({arrayBuffer: buffer})
          message.value = result.value
          break
        }
      
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        {
          const rows = await readXlsxFile(file)
          message.value = tablemark(rows)
          break
        }
      case "application/pdf":
        message.value = await extractTextFromPdf(file)
        break;
      default:
        break;
    }
  } catch (error) {
    console.log('requestToConvertFile', error);
  }
}

function readAsText(file) {
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

function readAsArrayBuffer(file) {
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

async function loadPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfData = new Uint8Array(arrayBuffer);
  return pdfjsLib.getDocument({ data: pdfData }).promise;
}

async function extractTextFromPage(pdf, pageNumber) {
  const page = await pdf.getPage(pageNumber);
  const content = await page.getTextContent();
  const strings = content.items.map((item) => item.str);
  return strings;
}

async function extractTextFromPdf(file) {
  const pdf = await loadPdf(file);
  const numPages = pdf.numPages;

  let extractedText = "";

  for (let i = 1; i <= numPages; i++) {
    const pageText = await extractTextFromPage(pdf, i);
    extractedText += pageText.join(" ") + "\n";
  }

  return extractedText;
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
  