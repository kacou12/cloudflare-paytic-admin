import './assets/main.css'
import 'vue-pdf-embed/dist/styles/annotationLayer.css'
import 'vue-pdf-embed/dist/styles/textLayer.css'

import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import Toast, { type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import router from './router'

import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'

const app = createApp(App)

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: { queries: { staleTime: 3600 } },
  },
}

const pinia = createPinia()

pinia.use(piniaPluginPersistedState)
app.use(pinia)
app.use(Toast, {
  autoClose: 3000,
  // ...
} as PluginOptions)
// app.use(VueEasyLightbox)
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
