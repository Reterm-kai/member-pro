/**
 * 自定义 React Hooks 统一管理
 * 将可复用的 hooks 集中在此目录下管理
 */

// 示例：useDebounce hook
export { default as useDebounce } from './useDebounce';

// 示例：useThrottle hook
export { default as useThrottle } from './useThrottle';

// 导出现有的 hooks
export { default as useLocale } from '../utils/useLocale';
export { default as useStorage } from '../utils/useStorage';
