import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/reset.css'
import Prompt from './components/Prompt'

const app = createApp(App)

app.component('Prompt', Prompt)
app.use(store).use(router).mount('#app')
