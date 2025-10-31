import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePluginForArco } from '@arco-plugins/vite-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginForArco({
      theme: '@arco-themes/react-arco-pro'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {}
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true, // 允许外部访问
    cors: true, // 启用 CORS
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // 生产环境不生成 sourcemap
    minify: 'terser', // 使用 terser 压缩
    chunkSizeWarningLimit: 1000, // chunk 大小警告限制（KB）
    rollupOptions: {
      output: {
        // 手动配置代码分割
        manualChunks: {
          // React 核心库
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Redux 状态管理
          'redux-vendor': ['react-redux', 'redux'],
          // Arco Design 组件库
          'arco-vendor': ['@arco-design/web-react'],
          // 工具库
          'utils-vendor': ['axios', 'dayjs', 'lodash', 'classnames'],
          // 图表库（通常较大，单独分离）
          'chart-vendor': ['bizcharts', '@antv/data-set'],
        },
        // 静态资源命名
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // 根据文件类型分类存放
          const info = assetInfo.name.split('.')
          let extType = info[info.length - 1]
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'media'
          } else if (/\.(png|jpe?g|gif|svg|ico|webp)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'images'
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'fonts'
          }
          return `${extType}/[name]-[hash][extname]`
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除 console
        drop_debugger: true, // 移除 debugger
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@arco-design/web-react',
    ],
  },
})
