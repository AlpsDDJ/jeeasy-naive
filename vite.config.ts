import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteRestart from 'vite-plugin-restart'
import * as path from 'path'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default () =>
  defineConfig({
    plugins: [
      vue({
        script: {
          propsDestructure: true,
          defineModel: true
        }
      }),
      VueJsx(),
      // VueSetupExtend(),
      ViteRestart({
        restart: ['my.config.[jt]s']
      }),
      AutoImport({
        dirs: ['src/components', 'src/hooks/**', 'src/enums/**'],
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
        resolvers: [NaiveUiResolver()]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true,
          additionalData: '@import "src/assets/style/var.less";'
        }
      }
    },
    resolve: {
      //设置别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '/#/': path.resolve(__dirname, 'types')
      }
    },
    build: {
      minify: 'terser',
      terserOptions: {
        // mangle: false, // 禁止重命名
        keep_classnames: true // 保留类名
        // keep_fnames: true // 保留函数名
      }
    },
    server: {
      port: 3333, //启动端口
      hmr: {
        host: '127.0.0.1',
        // clientPort: 8092,
        port: 8979
      },
      // 设置 https 代理
      proxy: {
        '/jeeasy-api': {
          target: 'http://localhost:6666',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/jeeasy-api/, '')
        }
      }
    }
  })
