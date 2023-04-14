<template>
  <button v-if="!recording" @click="startRecording" title="Whisper" type="button" v-bind:disabled="isBusy" class="text-slate-300 text-3xl pr-2">
    <font-awesome-icon icon="fa-solid fa-circle-play" />
  </button>
  <button v-else @click="stopRecording" title="Whisper" type="button" v-bind:disabled="isBusy" class="text-red-400 text-3xl pr-2 animate-pulse">
    <font-awesome-icon icon="fa-solid fa-circle " />
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { messageStore } from '../stores/messageStore.js'

const store = messageStore()
const recorder = ref(null)
const recording = ref(false)
const recordedChunks = ref([])

defineProps({
  isBusy: Boolean
})

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const options = {mimeType: 'audio/webm; codecs=opus'}
    recorder.value = new MediaRecorder(stream, options)
    recordedChunks.value = [];

    recorder.value.addEventListener('dataavailable', event => {
      recordedChunks.value.push(event.data)
    })

    recorder.value.start()
    recording.value = true
  } catch (error) {
    console.error('startRecording', error)
  }
}

const stopRecording = () => {
  recorder.value.stop()
  recording.value = false

  setTimeout(async() => {
    const blob = new Blob(recordedChunks.value, {type: 'audio/webm'})
    await store.transcribeVoice(blob)
  }, 1000);
}
</script>