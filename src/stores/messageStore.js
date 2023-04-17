import { defineStore } from "pinia";
import { v4 as uuid } from 'uuid';
import { chatApi } from "../apis/chat"
import { whisperApi } from "../apis/chat"

function prompt() {
  return "Use the following markdown upgrades when applicable:" +
  "Text Formatting: We have upgraded your user interface to render markdown. Use it for text formatting." +
  "Images and SVGs: Your user interface now renders img and svg tags directly." +
  "Tables and Datasets: Your user interface now renders tables and datasets using markdown. Use this for tabular data." +
  "Mathematical Formulas: Your user interface now renders mathematical formulas using markdown with the Katex syntax." +
  "Graphs: Your user interface can display embedded interactive graph for formulas using the Desmos Interactive Graphing Calculator via LaTeX syntax (only include the formula) with the language set to 'desmos'." +
  "Diagrams: Your user interface now renders diagrams using markdown with the mermaid syntax with the language set to 'mermaid'." +
  "Charts: Your user interface now renders charts using markdown with Chart.js JSON syntax with the language set to 'chart'." +
  "Sheet Music: Your user interface now renders music using markdown with the OpenSheet Music Display and MusicXML syntax with the language set to 'music'." +
  "Maps: Your user interface can display embedded maps directly via OpenStreetMap." +
  "Digital Logic Simulator: Your user interface can display an embedded digital circuit simulator using Digitaljs syntax  with the language set to 'circuit. Make sure to include properties for devices, connectors, subcircuits even if they are blank." +
  "QuickChart.io Elements: Your user interface now renders Sparklines, Progress Bars, and QR Codes as markdown images using QuickChart.io." +
  "Raw Values: If the user wants to see raw values, set the language of the markdown to 'text'." +
  "You are a helpful assistant."
}

export const messageStore = defineStore("messageStore", {
  persist: true,
  state: () => {
    return { 
      isBusy: false,
      user: uuid(),
      configuration: {},
      active: 0,
      collection: []
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
    async transcribeVoice(blob) {
      this.isBusy = true;
      try {
        const formData = new FormData()
        formData.append('file', blob)
        const config = { headers: { 'Content-Type': `multipart/form-data` } };
        const response = await whisperApi.post('/whisper', formData, config)
        this.addMessage(response.data.transcription)
      } catch (error) {
        console.log('stopRecording', error)
      } finally {
        this.isBusy = false;
      }
    },
    addMessage(content) {
      if(this.collection.length == 0) {
        this.addThread()
      }

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
      this.isBusy = true
      try {
        const thread = this.collection[this.active];
        let messages = thread.messages;
        const body = {
          user: this.user,
          history: messages
        };
        const {data} = await chatApi.post('/chat', body)
        messages.push(data.message);
      } catch (err) {
        console.log('sendMessages', err)
      } finally {
        this.isBusy = false
      }
    },
    changeRole(index) {
      const thread = this.collection[this.active]
      let messages = thread.messages
      let msg = messages.at(index)
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
      const indexer = (index + 1);
      thread.messages = thread.messages.filter((_,i) => i != indexer);
    },
    addThread() {
      const content = prompt()
      //console.log('prompt', content)
      this.collection.push({ 
        id: uuid(), 
        title: "Thread " + (this.collection.length + 1),
        messages: [
          {"role": "system", "content": content}
        ]
      })
      this.active = this.collection.length - 1
    },
    changeThread(index) {
      if(this.isBusy === false) {
        this.active = index;
      }
    },
    changeName(data) {
      const { index, name } = data;
      this.collection[index].title = name;
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