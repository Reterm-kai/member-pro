# 🚀 快速启动指南

## 第一步：安装依赖

```bash
pnpm install
```

## 第二步：启动开发服务器

```bash
pnpm dev
```

项目将在 http://localhost:3000 自动打开。

---

## ✅ 已完成的升级（2025-10-31）

### 核心修复
- ✅ 安装所有缺失依赖（react-router-dom、react-redux、query-string 等）
- ✅ 升级 Arco Design 到最新版本（2.66.6）
- ✅ React Router v5 → v6 完整迁移
- ✅ Vite 配置完善（路径别名、Less 支持、Arco 插件）
- ✅ 入口文件重构（Redux Provider、BrowserRouter 集成）
- ✅ 修复 ESLint 配置错误
- ✅ 优化 TypeScript 配置（移除实验性特性）

### 文件修改清单
1. [package.json](package.json) - 添加/升级依赖
2. [vite.config.ts](vite.config.ts) - 完整配置
3. [src/App.tsx](src/App.tsx) - 重构入口
4. [src/layout.tsx](src/layout.tsx) - Router v6 迁移
5. [eslint.config.js](eslint.config.js) - 修复配置
6. [tsconfig.app.json](tsconfig.app.json) - 优化配置
7. [CLAUDE.md](CLAUDE.md) - 更新文档
8. [UPGRADE_SUMMARY.md](UPGRADE_SUMMARY.md) - 详细升级报告

---

## 📖 详细文档

- **开发指南**: 查看 [CLAUDE.md](CLAUDE.md)
- **升级详情**: 查看 [UPGRADE_SUMMARY.md](UPGRADE_SUMMARY.md)

---

## ⚠️ 重要提醒

### 可能需要手动修复的部分

如果项目中其他文件使用了 React Router v5 API，请手动更新：

```bash
# 搜索需要更新的代码
grep -r "useHistory" src/
grep -r "history.push" src/
grep -r "history.replace" src/
```

**迁移对照表**：
| v5 | v6 |
|----|-----|
| `useHistory()` | `useNavigate()` + `useLocation()` |
| `history.push('/path')` | `navigate('/path')` |
| `history.replace('/path')` | `navigate('/path', { replace: true })` |
| `<Redirect to="/path" />` | `<Navigate to="/path" replace />` |
| `<Switch>` | `<Routes>` |
| `<Route component={Comp} />` | `<Route element={<Comp />} />` |

---

## 🎯 测试清单

启动项目后，请测试以下功能：

- [ ] 首页正常加载
- [ ] 菜单导航正常跳转
- [ ] 侧边栏折叠/展开功能
- [ ] 面包屑导航显示正确
- [ ] 页面样式正常渲染
- [ ] 所有页面模块可访问

---

## 📞 遇到问题？

### 清理缓存重新安装
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 清理 Vite 缓存
```bash
rm -rf node_modules/.vite
```

### 检查 Node.js 版本
```bash
node -v  # 推荐 v18+ 或 v20+
pnpm -v  # 推荐 v8+
```

---

**祝你开发顺利！** 🎉
