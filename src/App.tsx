import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import { GlobalContext } from './context';
import PageLayout from './layout';
import Login from './pages/login';
import rootReducer from './store';
import checkLogin from './utils/checkLogin';
import './style/global.less';

// 创建 Redux store
const reduxStore = configureStore({
  reducer: rootReducer,
});

// 路由守卫组件
function AuthGuard({ children }: { children: React.ReactElement }) {
  const isLogin = checkLogin();

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// 根路由重定向组件
function RootRedirect() {
  const isLogin = checkLogin();

  if (isLogin) {
    return <Navigate to="/dashboard/workplace" replace />;
  }

  return <Navigate to="/login" replace />;
}

function App() {
  const [lang, setLang] = useState<string>('zh-CN');
  const [theme, setTheme] = useState<string>('light');

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };

  useEffect(() => {
    console.log('App mounted, login status:', checkLogin());
  }, []);

  return (
    <Provider store={reduxStore}>
      <GlobalContext.Provider value={contextValue}>
        <ConfigProvider locale={zhCN}>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Routes>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <AuthGuard>
                    <PageLayout />
                  </AuthGuard>
                }
              />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </GlobalContext.Provider>
    </Provider>
  );
}

export default App;
