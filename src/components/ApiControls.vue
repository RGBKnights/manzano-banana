<template>
    <div class="api-controls">
      <label for="model-select">Model:</label>
      <select id="model-select" v-model="model" @change="changeModel">
        <option value="davinci">Davinci</option>
        <option value="curie">Curie</option>
        <option value="babbage">Babbage</option>
        <option value="ada">Ada</option>
      </select>
      <label for="temperature-input">Temperature:</label>
      <input id="temperature-input" type="number" v-model="temperature" @change="changeTemperature" />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { usePinia } from 'pinia';
  
  export default defineComponent({
    name: 'ApiControls',
    setup() {
      const { state, actions } = usePinia();
      const model = ref(state.model);
      const temperature = ref(state.temperature);
  
      const changeModel = () => {
        actions.changeModel(model.value);
      };
  
      const changeTemperature = () => {
        actions.changeTemperature(temperature.value);
      };
  
      return { model, temperature, changeModel, changeTemperature };
    },
  });
  </script>
  
  <style scoped>
  .api-controls {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  </style>