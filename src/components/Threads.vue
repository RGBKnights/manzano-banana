<template>
 <div class="py-2 pl-2">
  <ul v-for="(t, i) of store.threads" class="">
      <li>
        <div class="flex h-6">
          <div class="flex-none">
            <font-awesome-icon icon="fa-solid fa-comments" />
          </div>
          <div class="grow pl-2">
            <span @click="changeThread(i)" class="cursor-pointer hover:underline">{{t.title}}</span>
          </div>
          <div class="flex-none opacity-0 hover:opacity-100">
            <div class="inline-flex rounded-md shadow-sm">
              <button  type="button" @click="editThreadName(i, t.title)" class="px-2 text-xs font-small text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 ">
                <font-awesome-icon icon="fa-solid fa-pen" />
              </button>
              <button @click="store.removeThread(t.id)" type="button" class="px-2  text-xs font-small text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700">
                <font-awesome-icon icon="fa-solid fa-xmark" />
              </button>  
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { messageStore } from "../stores/messageStore.js";
const store = messageStore();

function editThreadName(index, title) {
  const name = prompt("Please Enter Name.", title);
  store.changeName({index, name});
}

async function changeThread(index) {
  store.changeThread(index);
  document.querySelector('#msg-header').scrollIntoView();
}
</script>

<style scoped>
</style>
