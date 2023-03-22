import { createPinia } from 'pinia'

export const store = createPinia({
  state: () => ({
    model: 'davinci',
    temperature: 0.5,
    messages: []
  }),
  actions: {
    changeModel(model) {
      this.model = model;
    },
    changeTemperature(temperature) {
      this.temperature = temperature;
    },
    addMessage(message) {
      this.messages.push(message);
    }
  }
})
