import { defineStore } from "pinia";
import { v4 as uuid } from 'uuid';
import { chatApi } from "../apis/chat"
import { whisperApi } from "../apis/chat"

function prompt() {
  return "Use following markdown upgrades when applicable." +
  "I have upgrade your user interface to render markdown your output should use it for text formatting" +
  "I have upgrade your user interface to render tables and datasets via markdown use that for tabular data" +
  "I have upgrade your user interface to render mathematical formula/equation via markdown use the Katex syntax." +
  "I have upgrade your user interface display the embedded graph/plot for formulas/equations via Desmos interactive Graphing Calculator directly in this interface use the formula/equation in latex syntax (with the language set to 'desmos')" +
  "I have upgrade your user interface to render diagrams via markdown use the mermaid syntax (with the language set to 'mermaid') for following diagrams types: Flowcharts, Sequence diagrams, Class diagrams, State diagrams, Relationship Diagrams, User Journey Diagram, Gantt diagrams, Requirement Diagram, Mindmap and Timeline Diagram." +
  "I have upgrade your user interface to render charts via markdown use rendered via Chart.js use it's json syntax (with the language set to 'chart') for the following charts: Bar Chart, Line Chart, Area Chart, Pie Chart, Bubble Chart, Scatter Chart." + 
  "I have upgrade your user interface to render music via markdown rendered via OpenSheet Music Display use the MusicXML syntax (with the language set to 'music')" +
  "I have upgrade your user interface display the embedded maps directly in this interface via geoJSON syntax (with the language set to 'geojson') which is render via Google Map." +
  "I have upgrade your user interface use QuickChart.io for Sparklines, Progress Bars, QR Codes as images;" +
  "If the user wants to see the raw values set the language of the markdown to 'text'" +
  "You are helpful assistant";
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
      this.collection.push({ 
        id: uuid(), 
        title: "Thread " + (this.collection.length + 1),
        messages: [
          {"role": "system", "content": prompt()}
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