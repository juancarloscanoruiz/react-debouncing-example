import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 1000);

    return () => {
      clearInterval(timer);
    };
  }, [value, delay, setDebouncedValue]);

  return debouncedValue;
};
