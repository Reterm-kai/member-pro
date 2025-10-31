# Fordoes Pro - 企业级后台管理系统

<div align="center">

基于 **React 19 + TypeScript + Vite + Arco Design** 打造的现代化企业级后台管理系统模板

[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.14%20(Rolldown)-646CFF)](https://vite.dev/)
[![Arco Design](https://img.shields.io/badge/Arco%20Design-2.66.6-165DFF)](https://arco.design/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

</div>

## ✨ 特性

- 🚀 **最新技术栈**：React 19 + TypeScript 5.9 + Vite (Rolldown) + Arco Design
- 📦 **开箱即用**：完整的依赖配置，一键启动开发环境
- 🎨 **优雅的 UI**：基于 Arco Design Pro 的企业级 UI 组件库
- 🔐 **权限管理**：完善的权限路由系统，支持动态菜单和权限控制
- 🌍 **国际化**：内置中英文支持，可扩展其他语言
- 📱 **响应式布局**：适配各种屏幕尺寸
- 🎯 **TypeScript**：完整的类型定义，提升开发体验
- 📊 **数据可视化**：集成 BizCharts，支持丰富的图表类型
- 🛠️ **完善的工具链**：ESLint + Prettier + Git Hooks
- ⚡ **性能优化**：代码分割、懒加载、构建优化

## 📦 技术栈

### 核心框架
- **React 19** - UI 框架
- **TypeScript 5.9** - 类型系统
- **Vite (Rolldown)** - 构建工具，使用 Rust 编写的高性能打包器
- **React Router DOM v6** - 路由管理
- **Redux v5 + React Redux v9** - 状态管理

### UI 组件库
- **Arco Design 2.66** - 企业级 UI 组件库
- **Arco Design Pro** - Pro 版扩展组件

### 工具库
- **Axios** - HTTP 客户端
- **Day.js** - 日期处理
- **Lodash** - 工具函数库
- **BizCharts** - 图表库

### 开发工具
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **Simple Git Hooks** - Git hooks
- **Lint-staged** - 暂存区代码检查

## 🚀 快速开始

### 前置要求

- Node.js >= 18
- pnpm >= 8 (推荐使用 pnpm)

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发

```bash
# 启动开发服务器（默认端口 3000）
pnpm dev
```

访问 http://localhost:3000 查看应用。

### 构建

```bash
# 构建生产版本
pnpm build

# 仅构建（跳过 TypeScript 检查）
pnpm build:no-typecheck

# 预览生产构建
pnpm preview
```

## 📜 可用脚本

```bash
# 开发
pnpm dev              # 启动开发服务器

# 构建
pnpm build            # TypeScript 编译 + 生产构建
pnpm build:no-typecheck # 跳过类型检查的快速构建
pnpm preview          # 预览生产构建

# 代码质量
pnpm lint             # 运行 ESLint 检查
pnpm lint:fix         # 自动修复 ESLint 问题
pnpm format           # 格式化代码
pnpm format:check     # 检查代码格式
pnpm type-check       # TypeScript 类型检查

# 工具
pnpm clean            # 清理构建产物和缓存
pnpm analyze          # 分析构建产物
```

## 📁 项目结构

```
fordoes-pro/
├── public/           # 静态资源
├── src/
│   ├── api/          # API 接口管理
│   ├── assets/       # 项目资源文件
│   ├── components/   # 全局共享组件
│   ├── constants/    # 全局常量
│   ├── hooks/        # 自定义 Hooks
│   ├── locale/       # 国际化文件
│   ├── mock/         # Mock 数据
│   ├── pages/        # 页面组件
│   ├── store/        # Redux 状态管理
│   ├── style/        # 全局样式
│   ├── types/        # TypeScript 类型定义
│   ├── utils/        # 工具函数
│   ├── App.tsx       # 应用入口组件
│   ├── layout.tsx    # 布局组件
│   ├── routes.ts     # 路由配置
│   └── main.tsx      # 应用入口文件
├── .env.development  # 开发环境变量
├── .env.production   # 生产环境变量
├── .env.example      # 环境变量示例
├── .eslintrc         # ESLint 配置
├── .prettierrc       # Prettier 配置
├── .gitignore        # Git 忽略文件
├── CLAUDE.md         # Claude Code 开发指南
├── README.md         # 项目说明
├── package.json      # 项目配置
├── tsconfig.json     # TypeScript 配置
└── vite.config.ts    # Vite 配置
```

详细的目录结构说明请查看 [src/README.md](./src/README.md)

## 🔧 配置

### 环境变量

项目使用 `.env` 文件管理环境变量：

- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置
- `.env.example` - 环境变量示例（复制为 `.env.local` 使用）

**可用的环境变量：**

```bash
VITE_API_BASE_URL      # API 基础 URL
VITE_APP_TITLE         # 应用标题
VITE_USE_MOCK          # 是否启用 Mock 数据
VITE_ENABLE_CONSOLE    # 是否启用 console 输出
```

### 路径别名

项目配置了 `@` 作为 `src` 目录的别名：

```typescript
import { request } from '@/api';
import { UserInfo } from '@/types';
```

## 🎯 核心功能

### 路由系统

- **基于配置的路由**：所有路由在 `src/routes.ts` 集中管理
- **权限控制**：支持基于角色和资源的细粒度权限控制
- **动态菜单**：根据用户权限动态生成菜单
- **懒加载**：使用 `@loadable/component` 实现组件懒加载

### 权限管理

```typescript
// 在路由配置中定义权限
{
  name: 'menu.dashboard.monitor',
  key: 'dashboard/monitor',
  requiredPermissions: [
    { resource: 'menu.dashboard.monitor', actions: ['write'] }
  ],
  oneOfPerm: false // 是否满足任一权限即可（默认需要全部权限）
}
```

### 状态管理

使用简化的 Redux 模式：

```typescript
import { useSelector, useDispatch } from 'react-redux';

const { userInfo, settings } = useSelector((state) => state);
```

### API 请求

```typescript
import { request } from '@/api';

// GET 请求
const data = await request.get('/user/info');

// POST 请求
const result = await request.post('/user/login', { username, password });
```

## 🎨 主题定制

项目使用 Arco Design Pro 主题，可以通过以下方式定制：

1. 修改 `vite.config.ts` 中的主题配置
2. 在 `src/style` 目录下覆盖全局样式
3. 使用 Less 变量进行样式定制

## 📝 开发规范

### 添加新页面

1. 在 `src/pages/` 下创建对应目录和 `index.tsx`
2. 在 `src/routes.ts` 中添加路由配置
3. 在 `src/locale/` 添加国际化键值

### 代码风格

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 提交前自动运行 lint-staged 检查

### Git 提交规范

提交前会自动执行：
1. ESLint 检查并自动修复
2. Prettier 格式化代码

## ⚠️ 注意事项

1. **Arco Design 版本**：当前使用 2.66.6（最新稳定版）
2. **TypeScript 严格模式**：已关闭，建议逐步修复类型问题后重新启用
3. **BizCharts 兼容性**：与 React 19 有 peer dependency 警告，基本功能正常
4. **构建产物**：不要直接修改 `dist` 目录

## 🔗 相关链接

- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vite.dev/)
- [Arco Design 官方文档](https://arco.design/)
- [Arco Design Pro](https://arco.design/pro)

## 📄 开发者文档

- [CLAUDE.md](./CLAUDE.md) - Claude Code 开发指南
- [src/README.md](./src/README.md) - 目录结构详细说明

## 📄 许可证

[MIT](./LICENSE)

---

<div align="center">

Made with ❤️ by Fordoes Team

</div>
