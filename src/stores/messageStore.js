import { defineStore } from "pinia";
import { v4 as uuid } from 'uuid';

export const messageStore = defineStore("messageStore", {
  persist: true,
  state: () => {
    return { 
      id: uuid(),
      configuration: {},
      active: 0,
      collection: [{ 
        id: uuid(), 
        title: "Chat 1", 
        messages: [
          {"role": "system", "content": "You are helpful assistant."}
        ] 
      }]
    };
  },
  getters: {
    isNotEmpty(state) {
      return state.collection.length > 0;
    },
    threads(state) {
      return state.collection.map((s, i) => ({ index: i, id: s.id, title: s.title }));
    },
    messages(state) {
      return state.collection[state.active]?.messages ?? []; // ?.filter(m => m.role != "system")
    },
  },
  actions: {
    changeThread(index) {
      this.active = index;
    },
    addMessage(content) {
      this.collection[this.active]?.messages.push({"role": "user", "content": content});
    },
    addThread() {
      this.collection.push({ 
        id: uuid(), 
        title: "Chat " + (this.collection.length + 1),
        messages: [
          {"role": "system", "content": "You are helpful assistant."}
        ] 
      });
      this.active = this.collection.length - 1;
    },
    removeThread(id) {
      this.collection = this.collection.filter(t => t.id != id);
      this.active = this.collection.length - 1;
    },
  }
});