<template>
    <div>
        <button @click="store.addThread" >+</button>
        <template v-for="(t) of store.threads" >
            <div>
                <div @click="store.changeThread(t.index)">{{ t.title }} </div>
                <button @click="store.removeThread(t.id)">X</button> 
            </div>
        </template>
    </div>
</template>


<script setup>
import { messageStore } from '../stores/messageStore.js';
const store = messageStore();
</script>

<style scoped>
</style>
