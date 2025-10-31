/**
 * useThrottle Hook
 * 节流 Hook，用于限制函数执行频率
 */

import { useCallback, useRef } from 'react';

function useThrottle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number = 500
): T {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRun.current >= delay) {
        fn(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [fn, delay]
  );
}

export default useThrottle;
