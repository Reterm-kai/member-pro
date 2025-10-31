/**
 * TypeScript 类型定义统一管理
 * 将全局通用的类型定义集中在此目录下管理
 */

// 通用响应类型
export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

// 分页请求参数
export interface PageParams {
  current: number;
  pageSize: number;
}

// 分页响应数据
export interface PageResponse<T = unknown> {
  list: T[];
  total: number;
  current: number;
  pageSize: number;
}

// 用户信息类型
export interface UserInfo {
  id?: string;
  name?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  role?: string;
  permissions?: Record<string, string[]>;
  [key: string]: unknown;
}

// 菜单项类型
export interface MenuItem {
  key: string;
  name: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  hideInMenu?: boolean;
  [key: string]: unknown;
}
