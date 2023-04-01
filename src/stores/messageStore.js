import { defineStore } from "pinia";
import { v4 as uuid } from 'uuid';
import { chatApi } from "../apis/chat"

export const messageStore = defineStore("messageStore", {
  persist: true,
  state: () => {
    return { 
      isBusy: false,
      user: uuid(),
      configuration: {},
      active: 0,
      collection: [{ 
        id: uuid(), 
        title: "Thread 1", 
        messages: [
          {"role": "system", "content": "You are helpful assistant." }
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
      return state.collection[state.active]?.messages.filter(m => m.role != 'system') ?? [];
    },
  },
  actions: {
    changeThread(index) {
      this.active = index;
    },
    addMessage(content) {
      let messages = this.collection[this.active]?.messages;
      let msg = messages.at(-1);
      switch (msg.role) {
        case "system":
          messages.push({"role": "user", "content": content});
          break;
        case "assistant":
          messages.push({"role": "user", "content": content});
          break;
        case "user":
          messages.push({"role": "assistant", "content": content});
          break;
        default:
          break;
      }
    },
    async sendMessages() {
      this.isBusy = true;
      try {
        const thread = this.collection[this.active];
        let messages = thread.messages;
        const body = {
          user: this.user,
          history: messages
        };
        const {data} = await chatApi.post('/chat', body);
        messages.push(data.message);
      } catch (err) {
        console.log(err);
      } finally {
        this.isBusy = false;
      }
    },
    changeRole(index) {
      const thread = this.collection[this.active];
      let messages = thread.messages;
      let msg = messages.at(index);
      switch (msg.role) {
        case "assistant":
          msg.role ="user"
          break;
        case "user":
          msg.role ="assistant"
          break;
        default:
          break;
      }
    },
    deleteMessage(index) {
      const thread = this.collection[this.active];
      thread.messages = thread.messages.filter((_,i) => i != index);
    },
    addThread() {
      this.collection.push({ 
        id: uuid(), 
        title: "Thread " + (this.collection.length + 1),
        messages: [
          {"role": "system", "content": "I have enhanced your UI with the ability to render diagrams/charts using mermaid.js and if the user ask for the diagram or chart return the mermaid syntax wrapped in markdown with the language set 'mermaid' with an optional explanations of the diagram. You do not need to tell me about the enhancement. You are helpful assistant."}
        ] 
      });
      this.active = this.collection.length - 1;
    },
    removeThread(id) {
      this.collection = this.collection.filter(t => t.id != id);
      this.active = this.collection.length - 1;
    },
    clearThreads() {
      this.collection = [];
    }
  }
});