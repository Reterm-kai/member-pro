# 目录结构说明

本项目采用模块化的目录结构，便于代码的组织和维护。

## 核心目录

### `/src/api` - API 接口管理
统一管理所有 API 接口调用，包含：
- 请求配置（axios 实例）
- 请求/响应拦截器
- 具体业务 API 接口

**使用示例：**
```typescript
import { request } from '@/api';

export const getUserInfo = () => request.get('/user/info');
```

### `/src/hooks` - 自定义 React Hooks
统一管理可复用的自定义 Hooks，包含：
- `useDebounce` - 防抖 Hook
- `useThrottle` - 节流 Hook
- `useLocale` - 国际化 Hook
- `useStorage` - 本地存储 Hook

**使用示例：**
```typescript
import { useDebounce } from '@/hooks';

const debouncedValue = useDebounce(searchText, 500);
```

### `/src/types` - TypeScript 类型定义
统一管理全局类型定义，包含：
- API 响应类型
- 分页类型
- 用户信息类型
- 菜单项类型

**使用示例：**
```typescript
import type { ApiResponse, UserInfo } from '@/types';

const response: ApiResponse<UserInfo> = await getUserInfo();
```

### `/src/constants` - 全局常量
统一管理项目常量，包含：
- API 相关常量
- 存储键名常量
- 路由路径常量
- 主题和语言常量

**使用示例：**
```typescript
import { STORAGE_KEYS, ROUTES } from '@/constants';

localStorage.setItem(STORAGE_KEYS.TOKEN, token);
navigate(ROUTES.DASHBOARD);
```

### `/src/pages` - 页面组件
按功能模块组织的页面组件，每个页面可包含：
- `index.tsx` - 页面主文件（必需）
- `locale/` - 页面级国际化文件
- `mock/` - 页面级 Mock 数据
- `style/` - 页面级样式文件
- `components/` - 页面专属组件

### `/src/components` - 全局共享组件
项目级别的可复用组件，如：
- `NavBar` - 顶部导航栏
- `Footer` - 页脚
- `MessageBox` - 消息盒子
- `Chart` - 图表组件

### `/src/utils` - 工具函数
通用工具函数集合，如：
- `authentication.ts` - 权限校验
- `lazyload.tsx` - 懒加载封装
- `getUrlParams.ts` - URL 参数解析

### `/src/store` - 状态管理
Redux 状态管理相关文件：
- 全局状态定义
- Reducers
- Actions

### `/src/locale` - 国际化
全局国际化配置和语言包

### `/src/mock` - Mock 数据
全局 Mock 数据配置

### `/src/style` - 全局样式
全局样式文件和主题配置

### `/src/assets` - 静态资源
图片、字体等静态资源文件

## 路径别名

项目配置了 `@` 作为 `src` 目录的别名，可以使用绝对路径导入：

```typescript
import { request } from '@/api';
import { useDebounce } from '@/hooks';
import type { UserInfo } from '@/types';
import { STORAGE_KEYS } from '@/constants';
```

## 最佳实践

1. **API 集中管理**：所有 API 调用都应该定义在 `/src/api` 目录下
2. **复用 Hooks**：将可复用的逻辑提取为自定义 Hook 放在 `/src/hooks`
3. **类型安全**：充分利用 TypeScript，在 `/src/types` 中定义清晰的类型
4. **常量使用**：避免硬编码，将常量统一定义在 `/src/constants`
5. **组件分离**：页面专属组件放在页面目录下，可复用组件放在 `/src/components`
