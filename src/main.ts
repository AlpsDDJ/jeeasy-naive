import 'vue-global-api'
import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/store'

import '@/assets/style/tailwind.css'
import 'animate.css/animate.min.css'
import '@/assets/style/index.less'

// createApp(App).mount('#app')

async function bootstrap() {
  // const appProvider = createApp(NaiveProvider)

  //优先挂载一下 Provider 解决路由守卫，Axios中可使用，Dialog，Message 等之类组件
  // appProvider.mount('#naiveProvider', true)

  const app = createApp(App)
  // 挂载 Store
  await setupStore(app)
  // 挂载路由
  await setupRouter(app)
  // 路由准备就绪后挂载APP实例
  await router.isReady()
  app.mount('#app', true)

  // if (process.env.NODE_ENV === 'development') {
  //   const win: any = window
  //   if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in win) {
  //     win.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
  //   }
  // }
}

void bootstrap()
