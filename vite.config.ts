import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteRestart from 'vite-plugin-restart'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconResolver from 'unplugin-icons/resolver'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default () =>
  defineConfig({
    plugins: [
      vue(),
      VueJsx(),
      VueSetupExtend(),
      ViteRestart({
        restart: ['my.config.[jt]s']
      }),
      AutoImport({
        dirs: ['src/components'],
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
        dts: 'types/auto-import.d.ts',
        // eslintrc: { enabled: true },
        resolvers: [NaiveUiResolver()]
      }),
      Components({
        dirs: ['src/components'], // 目标文件夹
        extensions: ['vue', 'tsx'], // 文件类型
        dts: 'types/components.d.ts', // 输出文件，里面都是一些import的组件键值对
        // ui库解析器，也可以自定义，需要安装相关UI库
        deep: true,
        resolvers: [NaiveUiResolver(), IconResolver({ componentPrefix: 'icon' })]
      }),
      Icons({ compiler: 'vue3', scale: 1, defaultClass: 'inline-block', autoInstall: true })
      // createStyleImportPlugin({
      //     resolves: [NutuiResolve()],
      // }),
    ],
    resolve: {
      //设置别名
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      port: 3333, //启动端口
      hmr: {
        host: '127.0.0.1',
        port: 8080
      },
      // 设置 https 代理
      proxy: {
        '/api': {
          target: 'your https address',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '')
        }
      }
    }
  })
