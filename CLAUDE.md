# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 **Arco Design Pro** 的 React + TypeScript 后台管理系统模板，使用 Vite (rolldown-vite) 作为构建工具。

**⚠️ 重要提示**：本项目已完成依赖升级和架构优化（2025-10-31），请务必先运行 `pnpm install` 安装所有依赖。

## 常用命令

### 开发与构建
```bash
pnpm install  # 首次使用或依赖更新后必须运行
pnpm dev      # 启动开发服务器（默认端口 3000）
pnpm build    # TypeScript 编译 + 生产构建
pnpm preview  # 预览生产构建
pnpm lint     # 运行 ESLint 检查
```

### 包管理
- 项目使用 **pnpm** 作为包管理器
- 已配置 `pnpm.overrides` 强制使用 `rolldown-vite@7.1.14`

## 核心架构

### 路由系统 (src/routes.ts)
- **基于配置的路由定义**：所有路由在 `routes.ts` 中集中定义，包含权限控制和面包屑配置
- **动态路由过滤**：`useRoute` hook 根据用户权限动态过滤可见路由
- **权限模型**：
  - `requiredPermissions`: 定义资源和操作的权限要求
  - `oneOfPerm`: 支持"满足任一权限"的逻辑
  - 权限格式: `{ resource: string, actions: string[] }`
- **自动组件加载**：通过 `import.meta.glob('./pages/**/[a-z[]*.tsx')` 实现约定式路由

### 布局系统 (src/layout.tsx)
- **三层布局结构**：Navbar (顶部导航) + Sider (侧边栏菜单) + Content (内容区)
- **响应式侧边栏**：支持折叠/展开，断点为 `xl`
- **面包屑导航**：基于路由配置自动生成，可通过 `breadcrumb: false` 禁用
- **菜单状态管理**：
  - `selectedKeys`: 当前选中的菜单项
  - `openKeys`: 展开的子菜单
  - 通过 `routeMap` 和 `menuMap` 维护路由与菜单的映射关系

### 代码拆分与懒加载 (src/utils/lazyload.tsx)
- 使用 `@loadable/component` 实现组件懒加载
- 自定义 `LoadingComponent` 提供加载状态反馈
- 支持 `preload()` 方法预加载组件

### 状态管理 (src/store)
- 使用简化的 Redux 模式（单 reducer）
- 全局状态包含：
  - `settings`: 应用配置（菜单宽度、是否显示导航栏/菜单/页脚等）
  - `userInfo`: 用户信息和权限
  - `userLoading`: 用户加载状态

### 页面组织规范
- 所有页面组件位于 `src/pages/` 目录
- 每个页面必须有 `index.tsx` 作为入口文件
- 路由 key 必须与文件路径对应（例如 `dashboard/workplace` → `pages/dashboard/workplace/index.tsx`）
- 支持嵌套路由，通过 `children` 字段定义

### 工具函数 (src/utils)
关键工具模块：
- `authentication.ts`: 权限校验逻辑
- `lazyload.tsx`: 组件懒加载封装
- `useLocale.ts`: 国际化 hook
- `useRoute` (routes.ts): 权限路由过滤
- `getUrlParams.ts`: URL 参数解析
- `is.ts`: 类型判断工具

### 优化后的目录结构 (2025-10-31 新增)

为了提升代码的可维护性和可扩展性，项目新增了以下标准化目录：

#### `/src/api` - API 接口统一管理
- 集中管理所有 API 接口调用
- 包含配置好的 axios 实例（带请求/响应拦截器）
- 使用方式：`import { request } from '@/api'`

#### `/src/hooks` - 自定义 React Hooks
- 统一管理可复用的自定义 Hooks
- 内置：`useDebounce`（防抖）、`useThrottle`（节流）
- 重新导出现有的 `useLocale`、`useStorage` 等

#### `/src/types` - TypeScript 类型定义
- 统一管理全局类型定义
- 包含：`ApiResponse`、`PageParams`、`UserInfo`、`MenuItem` 等
- 使用方式：`import type { UserInfo } from '@/types'`

#### `/src/constants` - 全局常量
- 统一管理项目常量
- 包含：API 配置、存储键名、路由路径、主题语言等
- 使用方式：`import { STORAGE_KEYS, ROUTES } from '@/constants'`

> 📖 完整的目录结构说明请参考 [src/README.md](src/README.md)

## 开发规范

### 添加新页面
1. 在 `src/pages/` 下创建对应目录和 `index.tsx`
2. 在 `src/routes.ts` 中添加路由配置：
   ```typescript
   {
     name: 'menu.xxx',
     key: 'path/to/page',
     requiredPermissions: [...], // 可选
   }
   ```
3. 在 `src/locale/` 添加国际化键值（如 `menu.xxx`）

### 权限控制
- 在路由配置中添加 `requiredPermissions` 字段
- 使用 `oneOfPerm: true` 实现"或"逻辑（默认为"且"逻辑）
- 通过 `src/utils/authentication.ts` 的 `auth` 函数进行权限校验

### 菜单图标
- 在 `src/layout.tsx` 的 `getIconFromKey` 函数中添加图标映射
- 使用 `@arco-design/web-react/icon` 提供的图标

### 隐藏路由
- 设置 `ignore: true` 可将路由从菜单中隐藏，但保留访问能力
- 适用场景：详情页、编辑页等不需要显示在菜单的页面

## 技术栈依赖

### 核心库
- **React 19**: UI 框架
- **TypeScript 5.9**: 类型系统
- **Vite (rolldown-vite)**: 构建工具，使用 Rolldown（Rust 编写的高性能打包器）
- **Arco Design**: UI 组件库
  - `@arco-design/web-react@2.66.6`: 核心组件
  - `arco-design-pro@2.8.1`: Pro 版扩展组件
  - `@arco-themes/react-arco-pro`: Pro 主题

### 路由与状态
- **React Router DOM v6.28+**: 路由管理
- **React Redux v9.2+**: 状态管理
- **Redux v5.0+**: 状态容器
- **@loadable/component@5.16+**: 代码拆分和懒加载

### 工具库
- **axios@1.7+**: HTTP 客户端
- **dayjs@1.11+**: 日期处理
- **lodash@4.17+**: 工具函数库
- **query-string@9.1+**: URL 参数解析
- **nprogress@0.2+**: 进度条
- **classnames@2.5+**: 类名工具
- **copy-to-clipboard@3.3+**: 剪贴板操作
- **mockjs@1.1+**: Mock 数据生成

### 图表与可视化
- **bizcharts@4.1+**: 基于 G2 的 React 图表库
- **@antv/data-set@0.11+**: 数据处理
- **react-color@2.19+**: 颜色选择器

### 样式与UI
- **Less**: CSS 预处理器
- **Arco Design**: 完整的 UI 组件库生态

### 构建与开发工具
- **ESLint 9**: 代码检查
  - 配置了 TypeScript、React Hooks、React Refresh 规则
  - 全局忽略 `dist`、`node_modules` 目录
- **TypeScript 5.9**: 三个配置文件
  - `tsconfig.json`: 总配置（引用其他两个）
  - `tsconfig.app.json`: 应用代码配置（已配置 `@/*` 路径别名）
  - `tsconfig.node.json`: Node.js 工具配置

## 重要变更记录 (2025-10-31)

### ✅ 已完成的升级和修复

1. **依赖完整安装**：
   - 核心路由：react-router-dom@6.28、react-redux@9.2、redux@5.0
   - 工具库：axios@1.7、dayjs@1.11、lodash@4.17、mockjs@1.1
   - UI组件：@loadable/component、query-string、nprogress、classnames、copy-to-clipboard
   - 图表库：bizcharts@4.1、@antv/data-set@0.11、react-color@2.19
   - 构建工具：less@4.2+
   - 类型定义：@types/lodash、@types/mockjs、@types/react-color
   - Arco Design：@arco-design/web-react@2.66.6（最新稳定版）

2. **React Router 迁移**（v5 → v6）：
   - `Switch` → `Routes`
   - `<Route component={...}>` → `<Route element={<.../>}>`
   - `<Redirect>` → `<Navigate>`
   - `useHistory()` → `useNavigate()` + `useLocation()`

3. **Vite 配置增强**：
   - 添加 `@/*` 路径别名解析
   - 集成 Less 预处理器支持
   - 集成 Arco Design Vite 插件和主题
   - 配置开发服务器（端口 3000，自动打开浏览器）

4. **入口文件重构**：
   - `src/App.tsx`: 集成 Redux Provider、BrowserRouter、ConfigProvider
   - 正确连接 `layout.tsx` 到应用主流程
   - 添加 Login 路由分离

5. **配置优化**：
   - 修复 ESLint 配置错误（采用 ESLint 9 flat config）
   - 优化 TypeScript 配置
   - 添加 TypeScript 路径映射（`@/*`）

6. **目录结构优化**（新增）：
   - `src/api/` - API 接口统一管理（包含配置好的 axios 实例）
   - `src/hooks/` - 自定义 Hooks（useDebounce、useThrottle 等）
   - `src/types/` - TypeScript 类型定义
   - `src/constants/` - 全局常量
   - `src/README.md` - 完整的目录结构说明文档

## 注意事项

- **不要直接修改 dist 目录**：该目录由构建生成
- **国际化键值规范**：菜单名称必须使用 `menu.*` 前缀
- **页面组件路径约定**：必须严格遵循 `pages/路由key/index.tsx` 规范
- **权限数据结构**：`userInfo.permissions` 格式为 `Record<string, string[]>`，键为资源名，值为操作数组
