<template>
  <div data-dial-init class="fixed top-6 right-6 group z-50">
    <button type="button" data-dial-toggle="speed-dial-menu-top-left" aria-controls="speed-dial-menu-top-left" aria-expanded="false" class="flex items-center justify-center text-white rounded-full w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-yellow-300 hover:to-yellow-500">
      <font-awesome-icon icon="fa-solid fa-comments" />
        <span class="sr-only">Open actions menu</span>
    </button>
    <div id="speed-dial-menu-top-left" class="flex flex-col items-center hidden mt-4 space-y-2">
        <button  @click="store.addThread" type="button" data-tooltip-target="tooltip-share" data-tooltip-placement="left" class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200">
            <font-awesome-icon icon="fa-solid fa-plus" />
            <span class="sr-only">New</span>
        </button>
        <div id="tooltip-share" role="tooltip" class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip ">
            New
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button type="button" data-modal-target="defaultModal" data-modal-toggle="defaultModal" data-tooltip-target="tooltip-copy" data-tooltip-placement="left" class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200">
            <font-awesome-icon icon="fa-solid fa-list" />
            <span class="sr-only">Threads</span>
        </button>
        <div id="tooltip-copy" role="tooltip" class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
            Threads
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
  </div>
  <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
    <div class="relative w-full h-full max-w-2xl md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Threads
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <ul v-for="t of store.threads">
                <li>
                  <div class="flex">
                    <div @click="store.changeThread(t.index)" class="flex-auto cursor-pointer font-medium rounded text-sm underline mr-2 mr-2">
                      {{ t.title }}
                    </div>
                    <button @click="store.removeThread(t.id)" type="button"
                        class="flex-none text-white font-medium rounded text-sm p-2.5 text-center inline-flex items-center mr-2 mr-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-pink-300 hover:to-red-500">
                        <font-awesome-icon icon="fa-solid fa-xmark" />
                    </button>  
                  </div>
                </li>
              </ul>
            </div>
            <!-- Modal footer -->
            <!-- <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
            </div> -->
        </div>
    </div>
</div>
  <!-- <div class="flex flex-row py-4 mx-2">
    <div class="flex-none">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl">Threads</h1>
    </div>
    <div class="flex-auto"></div>
    <div class="flex-none">
      <button @click="store.addThread" type="button"
        class="text-white font-medium rounded text-sm p-2.5 text-center inline-flex items-center mr-2 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-yellow-300 hover:to-yellow-500 ">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>  
    </div>
  </div>
  <hr class="h-px mx-2 bg-gray-200 border-0" />
  <div class="mx-2 mt-4">
    <template v-for="t of store.threads">
      <div class="flex">
        <div @click="store.changeThread(t.index)" class="cursor-pointer flex-auto text-lg font-medium mr-2 px-2.5 py-0.5 rounded  ">
          {{ t.title }}
        </div>
        <button @click="store.removeThread(t.id)" type="button"
            class="text-white font-medium rounded text-sm p-3 text-center inline-flex items-center mr-2 mr-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-pink-300 hover:to-red-500">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>  
      </div>
    </template>
  </div> -->
</template>

<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { messageStore } from "../stores/messageStore.js";
const store = messageStore();
onMounted(() => {
  initFlowbite();
})
</script>

<style scoped></style>
