import React, { Suspense } from 'react';
import { Spin } from '@arco-design/web-react';
import styles from '../style/layout.module.less';

function LoadingComponent() {
  return (
    <div className={styles.spin}>
      <Spin />
    </div>
  );
}

export default (loader) => {
  const LazyComponent = React.lazy(loader);

  const ComponentWithSuspense = (props) => (
    <Suspense fallback={<LoadingComponent />}>
      <LazyComponent {...props} />
    </Suspense>
  );

  // 添加 preload 方法以兼容现有代码
  ComponentWithSuspense.preload = loader;

  return ComponentWithSuspense;
};
