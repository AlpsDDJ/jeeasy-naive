import { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

export function setupStore(app: App) {
  const pinia = createPinia()
  pinia.use(piniaPersist)
  app.use(pinia)
}
